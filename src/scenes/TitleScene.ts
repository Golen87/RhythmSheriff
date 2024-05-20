import BaseScene from "@/scenes/BaseScene";
import Music from "@/components/Music";

export default class TitleScene extends BaseScene {
	public hintText: Phaser.GameObjects.Text;
	public circle: Phaser.GameObjects.Arc;
	public titleRhythmBg: Phaser.GameObjects.Text;
	public titleRhythm: Phaser.GameObjects.Text;
	public titleSheriffBg: Phaser.GameObjects.Text;
	public titleSheriff: Phaser.GameObjects.Text;
	public graphics: Phaser.GameObjects.Graphics;
	public music: Music;
	public animationPlaying: boolean;

	constructor() {
		super({ key: "TitleScene" });
	}

	create() {
		this.fade(false, 100, 0x111111);
		this.cameras.main.setBackgroundColor(0x111111);

		/* Graphics */

		let bg = this.add.image(this.CX, this.CY, "title");
		this.fitToScreen(bg);

		this.hintText = this.addText({
			x: this.CX,
			y: 220,
			text: "Tap anywhere to start",
			size: 40,
			weight: 700,
			color: "white",
		});
		this.hintText.setOrigin(0.5, 1.1);
		this.hintText.alpha = 0;

		this.circle = this.add.circle(this.CX, 223, 200, 0xffffff, 0.15);

		this.titleRhythmBg = this.addText({
			x: this.CX,
			y: 220,
			text: " Rhythm ",
			fontFamily: "Texas",
			size: 130,
			color: "white",
		});
		this.titleRhythmBg.setStroke("#ffffffdd", 6);
		this.titleRhythmBg.setOrigin(0.5, 0.93);

		this.titleRhythm = this.addText({
			x: this.CX,
			y: 220,
			text: " Rhythm ",
			fontFamily: "Texas",
			size: 130,
			color: "black",
		});
		this.titleRhythm.setStroke("#ffffffdd", 6);
		this.titleRhythm.setOrigin(0.5, 0.93);

		this.titleSheriffBg = this.addText({
			x: this.CX,
			y: 220,
			text: " Sheriff ",
			fontFamily: "Texas",
			size: 130,
			color: "white",
		});
		this.titleSheriffBg.setStroke("#ffffffdd", 6);
		this.titleSheriffBg.setOrigin(0.5, 0.07);

		this.titleSheriff = this.addText({
			x: this.CX,
			y: 220,
			text: " Sheriff ",
			fontFamily: "Texas",
			size: 130,
			color: "black",
		});
		this.titleSheriff.setStroke("#ffffffdd", 6);
		this.titleSheriff.setOrigin(0.5, 0.07);

		let ctx = this.titleRhythm.context;
		let gradient = ctx.createLinearGradient(0, 0, 0, 150);
		gradient.addColorStop(0.1, "#7597cd");
		gradient.addColorStop(0.5, "#0d1727");

		this.titleRhythm.setFill(gradient);
		this.titleSheriff.setFill(gradient);

		let bulletLine = this.add.image(this.CX + 10, 223, "bullet_line");
		bulletLine.setScale(670 / bulletLine.width);

		/* Music */

		if (!this.music) {
			this.music = new Music(this, "jingle_anime", { volume: 0.5 });

			this.music.on("beat", this.onBeat, this);

			this.music.on("complete", () => {
				this.fade(true, 100, 0x111111);
				this.time.addEvent({
					delay: 1000,
					callback: () => {
						this.music.stop();
						this.scene.start("LevelScene");
					},
				});
			});
		}
		this.music.play();

		/* Debugging */

		if (this.input.keyboard) {
			this.input.keyboard.once("keydown-ONE", () => {
				this.music.stop();
				this.scene.start("EvaluationScene", { rating: "bad" });
			});
			this.input.keyboard.once("keydown-TWO", () => {
				this.music.stop();
				this.scene.start("EvaluationScene", { rating: "good" });
			});
			this.input.keyboard.once("keydown-THREE", () => {
				this.music.stop();
				this.scene.start("EvaluationScene", { rating: "great" });
			});
			this.input.keyboard.once("keydown-FOUR", () => {
				this.music.stop();
				this.scene.start("EvaluationScene", { rating: "perfect" });
			});
		}

		/* Animations */

		this.titleRhythm.x -= 50;
		this.titleRhythmBg.x -= 50;
		this.titleRhythm.setAlpha(0);
		this.titleRhythmBg.setAlpha(0);
		this.titleSheriff.x += 50;
		this.titleSheriffBg.x += 50;
		this.titleSheriff.setAlpha(0);
		this.titleSheriffBg.setAlpha(0);
		this.circle.setAlpha(0);

		this.animationPlaying = false;
	}

	update(time: number, delta: number) {
		this.hintText.alpha += 0.01;
		if (this.music.currentTime > 0) {
			this.hintText.setVisible(false);
		}
	}

	onBeat(time: number) {
		if (time == 1.0) {
			this.tweens.add({
				targets: [this.titleRhythm, this.titleRhythmBg],
				alpha: 1,
				x: "+=50",
				ease: "Cubic",
				// delay: 1 * this.music.speed * 1000,
				duration: 2 * this.music.speed * 1000,
			});
		}
		if (time == 2.0) {
			this.tweens.add({
				targets: [this.titleSheriff, this.titleSheriffBg],
				alpha: 1,
				x: "-=50",
				ease: "Cubic",
				// delay: 2 * this.music.speed * 1000,
				duration: 2 * this.music.speed * 1000,
			});
		}
		if (time == 3.0) {
			this.tweens.add({
				targets: this.circle,
				alpha: 1,
				ease: "Cubic",
				// delay: 3 * this.music.speed * 1000,
				duration: 4 * this.music.speed * 1000,
			});
		}
		if (time == 5.0) {
			this.tweens.add({
				targets: [this.titleRhythm, this.titleSheriff],
				alpha: 0.5,
				ease: "Sine",
				yoyo: true,
				// delay: 5 * this.music.speed * 1000,
				duration: 0.5 * this.music.speed * 1000,
			});
		}
	}
}
