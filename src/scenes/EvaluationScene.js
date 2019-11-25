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

		this.Results1 = this.sound.add('Results1', { volume: 0.5 });
		this.Results2 = this.sound.add('Results2', { volume: 0.5 });
		this.RatingOK = this.sound.add('RatingOK', { volume: 0.5 });

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


		this.textBox = this.add.rexRoundRectangle(200, 120, 500, 80, 40, 0xffffff);
		this.textBox.setOrigin(0, 0.5);
		this.textBox.setAlpha(0);

		this.text1 = this.add.text(200+250, 120, "Sheriff's notes:", { font: "bold 40px Wii", color: "black" });
		this.text1.setOrigin(0.5, 0.5);
		this.text1.setAlpha(0);
		this.text2 = this.add.text(200+40, 280, "You did " + result.rating + ".", { font: "bold 35px Wii" });
		this.text2.setOrigin(0.0, 0.5);
		this.text2.setAlpha(0);
		this.text3 = this.add.text(this.W - 100, 500, "<" + result.rating + " icon>", { font: "bold 40px Wii" });
		this.text3.setOrigin(1.0, 0.5);
		this.text3.setAlpha(0);
		this.tapText = this.add.text(this.CX, this.H-20, '[tap]', { font: "25px Wii" });
		this.tapText.setOrigin(0.5, 1.0);
		this.tapText.setAlpha(0);


		let delay = 1000;
		this.addEvent(delay, function() {
			this.textBox.setAlpha(1);
			this.text1.setAlpha(1);
			this.Results1.play();
		});

		delay += 1600;
		this.addEvent(delay, function() {
			this.text2.setAlpha(1);
			this.Results2.play();
		});

		delay += 2100;
		this.addEvent(delay, function() {
			this.text3.setAlpha(1);
			this.music.play();
		});

		delay += 1100;
		this.addEvent(delay, function() {
		});

		delay += 200;
		this.setupInput();
		this.addEvent(delay, this.enableTap);
	}


	addEvent(delay, callback) {
		return this.time.addEvent({
			delay: delay,
			callback: callback,
			callbackScope: this
		});
	}


	setupInput() {
		this.allowTap = false;
		this.hasTapped = false;
		if (!this._listeners) {
			this._listeners = true;

			let keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
			keySpace.on('down', this.onTapDown, this);
			keySpace.on('up', this.onTapUp, this);
			this.input.on('pointerdown', this.onTapDown, this);
			this.input.on('pointerup', this.onTapUp, this);

			this.TapDown = this.sound.add('TapDown', { volume: 0.5 });
			this.TapUp = this.sound.add('TapUp', { volume: 0.5 });
		}
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
				delay: 1500,
				callback: function() {
					this.music.stop();
					this.scene.start("EpilogueScene", this.result);
				},
				callbackScope: this
			});
		}
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}