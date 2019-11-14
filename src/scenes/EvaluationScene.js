import Music from "./../components/Music.js";

export default class EvaluationScene extends Phaser.Scene {
	constructor() {
		super({key: 'EvaluationScene'});
	}

	create(result) {
		this.cameras.main.setBackgroundColor(0x111111);

		this.result = result;
		if (!result) {
			throw "EvaluationScene missing rating.";
		}

		let song = {
			'bad': 'bgm_epilogue_bad',
			'good': 'bgm_epilogue_good',
			'great': 'bgm_epilogue_great',
			'perfect': 'bgm_perfect_fan', // Skips epilogue
		}[result.rating];

		if (this.music) {
			this.music.destroy();
		}
		this.music = new Music(this, song, { volume: 0.5 });
		this.music.play();


		let text = this.add.text(100, 100, "Sheriff's notes:", { font: "40px Courier" });
		let text2 = this.add.text(100, 200, "You did " + result.rating + ".", { font: "40px Courier" });
		let text3 = this.add.text(this.W - 200, 400, "<" + result.rating + " icon>", { font: "40px Courier" });
		text3.setOrigin(1, 0);
		let text4 = this.add.text(this.CX, this.H-20, '[SPACE]', { font: "40px Courier" });
		text4.setOrigin(0.5, 1);


		this.input.keyboard.once('keydown-SPACE', this.onSpace, this);
	}

	update(time, delta) {
	}


	onSpace() {
		this.music.stop();
		this.scene.start("EpilogueScene", this.result);
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}