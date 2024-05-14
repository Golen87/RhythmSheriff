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
		let text = {
			'bad': 'Better luck next time.',
			'good': 'Keep practicing.',
			'great': 'Amazing work.',
			'perfect': 'Perfection.',
		}[result.rating];

		if (this.music) {
			this.music.destroy();
		}
		this.music = new Music(this, song, { volume: 0.5 });
		this.music.play();


		this.text1 = this.add.text(this.CX, this.CY-100, "<Image>", { font: "bold 40px Wii" });
		this.text1.setOrigin(0.5);
		this.text2 = this.add.text(this.CX, this.CY+100, text, { font: "bold 40px Wii" });
		this.text2.setOrigin(0.5);
		this.tapText = this.add.text(this.CX, this.H-20, '[tap]', { font: "25px Wii" });
		this.tapText.setOrigin(0.5, 1);
		this.tapText.setAlpha(0);


		this.setupInput();
		this.addEvent(200, this.enableTap);
	}


	setupInput() {
		this.allowTap = false;
		this.hasTapped = false;
		if (!this._listeners) {
			this._listeners = true;

			let keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
			keySpace.on('down', this.onTapDown, this);
			keySpace.on('up', this.onTapUp, this);

			this.TapDown = this.sound.add('TapDown', { volume: 0.5 });
			this.TapUp = this.sound.add('TapUp', { volume: 0.5 });
		}
		this.input.on('pointerdown', this.onTapDown, this);
		this.input.on('pointerup', this.onTapUp, this);
	}

	enableTap() {
		this.allowTap = true;
		this.tapText.setAlpha(1);
	}

	disableTap() {
		this.allowTap = false;
		this.hasTapped = false;
	}

	onTapDown(event) {
		if (this.allowTap) {
			this.hasTapped = true;
			this.TapDown.play();
		}
	}

	onTapUp(event) {
		if (this.allowTap && this.hasTapped) {
			this.disableTap();

			this.TapUp.play();
			this.cameras.main.fadeEffect.start(true, 500, 0x11, 0x11, 0x11);

			this.tweens.add({
				targets: this.music,
				volume: 0,
				duration: 1000
			});

			this.time.addEvent({
				delay: 2000,
				callback: function() {
					this.music.stop();
					this.scene.start("TitleScene");
				},
				callbackScope: this
			});
		}
	}


	addEvent(delay, callback) {
		return this.time.addEvent({
			delay: delay,
			callback: callback,
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