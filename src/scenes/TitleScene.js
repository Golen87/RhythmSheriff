import Music from "./../components/Music.js";

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({key: 'TitleScene'});
	}

	create() {
		this.cameras.main.setBackgroundColor(0x111111);
		this.cameras.main.fadeEffect.start(false, 100, 0x11, 0x11, 0x11);


		/* Graphics */

		let bg = this.add.image(this.CX, this.CY, 'title');
		this.fitToScreen(bg);

		this.hintText = this.add.text(this.CX, 220, "Tap anywhere to start", { font: "bold 40px Wii", color: "white" });
		this.hintText.setOrigin(0.5, 1.1);
		this.hintText.alpha = 0;

		this.circle = this.add.circle(this.CX, 223, 200, 0xffffff, 0.15);

		this.titleRhythmBg = this.add.text(this.CX, 220, " Rhythm ", { font: "130px 'Texas Tango'", color: "white", stroke: "#ffffffdd", strokeThickness: 6 });
		this.titleRhythmBg.setOrigin(0.5, 0.93);
		this.titleRhythm = this.add.text(this.CX, 220, " Rhythm ", { font: "130px 'Texas Tango'", color: "black", stroke: "#ffffffdd", strokeThickness: 6 });
		this.titleRhythm.setOrigin(0.5, 0.93);
		this.titleSheriffBg = this.add.text(this.CX, 220, " Sheriff ", { font: "130px 'Texas Tango'", color: "white", stroke: "#ffffffdd", strokeThickness: 6 });
		this.titleSheriffBg.setOrigin(0.5, 0.07);
		this.titleSheriff = this.add.text(this.CX, 220, " Sheriff ", { font: "130px 'Texas Tango'", color: "black", stroke: "#ffffffdd", strokeThickness: 6 });
		this.titleSheriff.setOrigin(0.5, 0.07);

		let ctx = this.titleRhythm.context;
		let gradient = ctx.createLinearGradient(0, 0, 0, 150);
		gradient.addColorStop(0.1, "#7597cd");
		gradient.addColorStop(0.5, "#0d1727");

		this.titleRhythm.setFill(gradient);
		this.titleSheriff.setFill(gradient);

		const Y = 223;
		let lineL = this.add.line(0, 0, this.CX-330, Y, this.CX+290, Y, 0xffffff);
		lineL.setLineWidth(0, 4);
		lineL.setOrigin(0);
		lineL.setAlpha(0xdd/0xff);
		let lineR = this.add.line(0, 0, this.CX+290, Y, this.CX+300, Y, 0xffffff);
		lineR.setLineWidth(4, 0);
		lineR.setOrigin(0);
		lineR.setAlpha(0xdd/0xff);

		this.graphics = this.add.graphics({
			x: 0,
			y: 0,
			fillStyle: {
				color: 0xeeeeee,
				alpha: 1
			},
			add: true
		});
		this.graphics.fillCircle(this.CX+310+24, Y, 5.6);
		this.graphics.fillRect(this.CX+310, Y-6, 24, 12);


		/* Music */

		if (!this.music) {
			this.music = new Music(this, 'jingle_anime', { volume: 0.5 });

			this.music.on('beat', this.onBeat, this);

			this.music.on('complete', function(music) {
				this.cameras.main.fadeEffect.start(true, 100, 0x11, 0x11, 0x11);
				this.time.addEvent({
					delay: 1000,
					callback: function() {
						this.music.stop();
						this.scene.start("LevelScene");
					},
					callbackScope: this
				});
			}, this);
		}
		this.music.play();


		/* Debugging */

		// this.input.keyboard.once('keydown-ONE', function() {
		// 	this.music.stop();
		// 	this.scene.start("EvaluationScene", {rating: 'bad'});
		// }, this);
		// this.input.keyboard.once('keydown-TWO', function() {
		// 	this.music.stop();
		// 	this.scene.start("EvaluationScene", {rating: 'good'});
		// }, this);
		// this.input.keyboard.once('keydown-THREE', function() {
		// 	this.music.stop();
		// 	this.scene.start("EvaluationScene", {rating: 'great'});
		// }, this);
		// this.input.keyboard.once('keydown-FOUR', function() {
		// 	this.music.stop();
		// 	this.scene.start("EvaluationScene", {rating: 'perfect'});
		// }, this);


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

	update(time, delta) {
		this.hintText.alpha += 0.01;
		if (this.music.getCurrentTime() > 0) {
			this.hintText.setVisible(false);
		}
	}

	onBeat(time) {
		if (time == 1.0) {
			this.tweens.add({
				targets: [this.titleRhythm, this.titleRhythmBg],
				alpha: 1,
				x: '+=50',
				ease: 'Cubic',
				// delay: 1 * this.music.speed * 1000,
				duration: 2 * this.music.speed * 1000
			});
		}
		if (time == 2.0) {
			this.tweens.add({
				targets: [this.titleSheriff, this.titleSheriffBg],
				alpha: 1,
				x: '-=50',
				ease: 'Cubic',
				// delay: 2 * this.music.speed * 1000,
				duration: 2 * this.music.speed * 1000
			});
		}
		if (time == 3.0) {
			this.tweens.add({
				targets: this.circle,
				alpha: 1,
				ease: 'Cubic',
				// delay: 3 * this.music.speed * 1000,
				duration: 4 * this.music.speed * 1000
			});
		}
		if (time == 5.0) {
			this.tweens.add({
				targets: [this.titleRhythm, this.titleSheriff],
				alpha: 0.5,
				ease: 'Sine',
				yoyo: true,
				// delay: 5 * this.music.speed * 1000,
				duration: 0.5 * this.music.speed * 1000
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