import Music from "./../components/Music.js";

export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({key: 'TitleScene'});
	}

	create() {
		// Background
		let bg = this.add.image(this.CX, this.CY, 'title');
		this.fitToScreen(bg);

		let title = this.add.bitmapText(600-50, 270, 'rye', "Rhythm");
		title.setOrigin(0.5, 0.8);
		let title2 = this.add.bitmapText(600+50, 270, 'rye', "Sheriff");
		title2.setOrigin(0.5, 0.2);
		
		// Music
		if (!this.music) {
			this.music = new Music(this, 'jingle_anime', { volume: 0.5 });
		}
		this.music.play();

		this.music.on('beat', function(bar) {
			//console.log('beat', bar);
		}, this);

		this.music.once('complete', function(music) {
			this.music.stop();
			this.scene.start("LevelScene");
		}, this);


		this.input.keyboard.once('keydown-ONE', function() {
			this.music.stop();
			this.scene.start("EvaluationScene", {rating: 'bad'});
		}, this);

		this.input.keyboard.once('keydown-TWO', function() {
			this.music.stop();
			this.scene.start("EvaluationScene", {rating: 'good'});
		}, this);

		this.input.keyboard.once('keydown-THREE', function() {
			this.music.stop();
			this.scene.start("EvaluationScene", {rating: 'great'});
		}, this);

		this.input.keyboard.once('keydown-FOUR', function() {
			this.music.stop();
			this.scene.start("EvaluationScene", {rating: 'perfect'});
		}, this);
	}

	update(time, delta) {
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}