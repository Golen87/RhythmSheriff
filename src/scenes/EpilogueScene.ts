import BaseScene from "./BaseScene";
import Music from "@/components/Music";

export default class EpilogueScene extends BaseScene {
	private music: Music;
	private image: Phaser.GameObjects.Image;
	private description: Phaser.GameObjects.Text;
	private tapText: Phaser.GameObjects.Text;

	private allowTap: boolean;
	private hasTapped: boolean;

	private TapDown: Phaser.Sound.WebAudioSound;
	private TapUp: Phaser.Sound.WebAudioSound;

	constructor() {
		super({ key: "EpilogueScene" });
	}

	create(result: { rating: "bad" | "good" | "great" | "perfect" }) {
		this.cameras.main.setBackgroundColor(0x111111);

		if (!result) {
			throw "EvaluationScene missing rating.";
		}

		let song = {
			bad: "jingle_epilogue_bad",
			good: "jingle_epilogue_good",
			great: "jingle_epilogue_great",
			perfect: "jingle_epilogue_great",
		}[result.rating];
		let imageKey = {
			bad: "ending2",
			good: "ending3",
			great: "ending1",
			perfect: "ending1",
		}[result.rating];
		let text = {
			bad: "Better luck next time.",
			good: "Keep practicing.",
			great: "That was some great practice.",
			perfect: "Steadiest hand in the West!",
		}[result.rating];

		if (this.music) {
			this.music.destroy();
		}
		this.music = new Music(this, song as any, { volume: 0.5 });
		this.music.play();

		this.image = this.add.image(this.CX, this.CY - 80, imageKey);
		this.image.setScale(this.W / 3 / this.image.width);
		this.image.setOrigin(0.5);

		this.description = this.addText({
			x: this.CX,
			y: this.CY + 120,
			text,
			size: 40,
			weight: 700,
		});
		this.description.setOrigin(0.5);

		this.tapText = this.addText({
			x: this.CX,
			y: this.H - 20,
			text: "[tap]",
			size: 25,
		});
		this.tapText.setOrigin(0.5, 1);
		this.tapText.setAlpha(0);

		this.setupInput();
		this.addEvent(200, this.enableTap);
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
				delay: 2000,
				callback: () => {
					this.music.stop();
					this.scene.start("TitleScene");
				},
				callbackScope: this,
			});
		}
	}
}
