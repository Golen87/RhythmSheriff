import Music from "./../components/Music.js";

export default class EpilogueScene extends Phaser.Scene {
	constructor() {
		super({key: 'EpilogueScene'});
	}

	create(result) {
		this.cameras.main.setBackgroundColor(0x111111);

		this.result = result;
		if (!result) {
			throw "EvaluationScene missing rating.";
		}

		let song = {
			'bad': 'jingle_epilogue_bad',
			'good': 'jingle_epilogue_good',
			'great': 'jingle_epilogue_great',
			'perfect': 'jingle_epilogue_great',
		}[result.rating];

		if (this.music) {
			this.music.destroy();
		}
		this.music = new Music(this, song, { volume: 0.5 });
		this.music.play();


		let text = this.add.text(this.CX, this.CY, "<Image>", { font: "40px Courier" });
		text.setOrigin(0.5);
		let text2 = this.add.text(this.CX, this.CY+100, result.rating + " description", { font: "40px Courier" });
		text2.setOrigin(0.5);
		let text3 = this.add.text(this.CX, this.H-20, '[SPACE]', { font: "40px Courier" });
		text3.setOrigin(0.5, 1);


		this.input.keyboard.once('keydown-SPACE', this.onSpace, this);
	}

	update(time, delta) {
	}


	onSpace() {
		this.cameras.main.fadeEffect.start(true, 1000, 0x11, 0x11, 0x11);

		this.tweens.add({
			targets: this.music,
			volume: 0,
			duration: 1000
		});

		this.time.addEvent({
			delay: 1500,
			callback: function() {
				this.music.stop();
				this.scene.start("TitleScene");
			},
			callbackScope: this
		});
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}