import BaseScene from "./BaseScene";
import Music from "@/components/Music";
import RatingBad from "@/components/RatingBad";
import RatingGood from "@/components/RatingGood";
import RatingGreat from "@/components/RatingGreat";
import RoundRectangle from "phaser3-rex-plugins/plugins/gameobjects/shape/roundrectangle/RoundRectangle";

export default class EvaluationScene extends BaseScene {
	private result: { rating: "bad" | "good" | "great" | "perfect" };
	private Results1: Phaser.Sound.WebAudioSound;
	private Results2: Phaser.Sound.WebAudioSound;
	private TapDown: Phaser.Sound.WebAudioSound;
	private TapUp: Phaser.Sound.WebAudioSound;

	private music: Music;
	private textBox: RoundRectangle;
	private text1: Phaser.GameObjects.Text;
	private text2: Phaser.GameObjects.Text;
	private tapText: Phaser.GameObjects.Text;
	private icon: RatingBad | RatingGood | RatingGreat;

	private allowTap: boolean;
	private hasTapped: boolean;

	constructor() {
		super({ key: "EvaluationScene" });
	}

	create(result: { rating: "bad" | "good" | "great" | "perfect" }) {
		this.cameras.main.setBackgroundColor(0x111111);

		this.result = result;
		if (!result) {
			throw "EvaluationScene missing rating.";
		}

		this.Results1 = this.sound.add("Results1", {
			volume: 0.5,
		}) as Phaser.Sound.WebAudioSound;
		this.Results2 = this.sound.add("Results2", {
			volume: 0.5,
		}) as Phaser.Sound.WebAudioSound;

		let song = {
			bad: "bgm_epilogue_bad",
			good: "bgm_epilogue_good",
			great: "bgm_epilogue_great",
			perfect: "bgm_perfect_fan",
		}[result.rating];
		let text = {
			bad: "Fast is fine, but accuracy\nis everything.",
			good: "Well, I think of you as a\nstraight shooter...\nmost of the time.",
			great: "There's a new sheriff in town.",
			perfect: "There's a new sheriff in town.\nY'all be cool. Right on.",
		}[result.rating];

		if (this.music) {
			this.music.destroy();
		}
		this.music = new Music(this, song as any, { volume: 0.5 });

		this.textBox = this.add.rexRoundRectangle(190, 100, 500, 80, 40, 0xffffff);
		this.textBox.setOrigin(0, 0.5);
		this.textBox.setAlpha(0);

		this.text1 = this.addText({
			x: 190 + 250,
			y: 100,
			text: "Sheriff's notes:",
			size: 40,
			weight: 700,
			color: "black",
		});
		this.text1.setOrigin(0.5, 0.5);
		this.text1.setAlpha(0);
		this.text2 = this.addText({
			x: 190 + 40,
			y: 260,
			text,
			size: 35,
			weight: 700,
		});
		this.text2.setOrigin(0.0, 0.5);
		this.text2.setAlpha(0);
		this.tapText = this.addText({
			x: this.CX,
			y: this.H - 50,
			text: "[tap]",
			size: 25,
		});
		this.tapText.setOrigin(0.5, 1.0);
		this.tapText.setAlpha(0);

		if (result.rating == "bad") {
			this.icon = new RatingBad(this, this.W - 220, 500);
		} else if (result.rating == "good") {
			this.icon = new RatingGood(this, this.W - 220, 500);
		} else {
			this.icon = new RatingGreat(this, this.W - 240, 500);
		}
		this.icon.setAlpha(0);

		let delay = 1000;
		this.addEvent(delay, () => {
			this.textBox.setAlpha(1);
			this.text1.setAlpha(1);
			this.Results1.play();
		});

		delay += 1600;
		this.addEvent(delay, () => {
			this.text2.setAlpha(1);
			this.Results2.play();
		});

		delay += 2100;
		this.addEvent(delay, () => {
			this.icon.show(this.time.now);
			this.music.play();
		});

		delay += 1300;
		this.setupInput();
		this.addEvent(delay, this.enableTap);
	}

	setupInput() {
		this.allowTap = false;
		this.hasTapped = false;
		if (this.input.keyboard) {
			let keySpace = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.SPACE
			);
			keySpace.on("down", this.onTapDown, this);
			keySpace.on("up", this.onTapUp, this);
		}

		this.TapDown = this.sound.add("TapDown", {
			volume: 0.5,
		}) as Phaser.Sound.WebAudioSound;
		this.TapUp = this.sound.add("TapUp", {
			volume: 0.5,
		}) as Phaser.Sound.WebAudioSound;

		this.input.on("pointerdown", this.onTapDown, this);
		this.input.on("pointerup", this.onTapUp, this);
	}

	enableTap() {
		this.allowTap = true;
		this.tapText.setAlpha(1);
	}

	disableTap() {
		this.allowTap = false;
		this.hasTapped = false;
	}

	onTapDown() {
		if (this.allowTap) {
			this.hasTapped = true;
			this.TapDown.play();
		}
	}

	onTapUp() {
		if (this.allowTap && this.hasTapped) {
			this.disableTap();

			this.TapUp.play();
			this.fade(true, 500, 0x111111);

			this.tweens.add({
				targets: this.music,
				volume: 0,
				duration: 1000,
			});

			this.time.addEvent({
				delay: 1500,
				callback: () => {
					this.music.stop();
					this.scene.start("EpilogueScene", this.result);
				},
				callbackScope: this,
			});
		}
	}

	update(time: number, delta: number) {
		this.icon.update(time, delta);
	}
}
