import Enemy from "./Enemy.js";

// 'circle.png'
// 'items.png'
// 'logo.png'
// 'small.png'

// 'practice.ogg'


// 'bullet_hole01.png'
// 'bullet_hole02.png'
// 'bullet_hole03.png'
// 'cat01.png'
// 'circle.png'
// 'dog01.png'
// 'dog02.png'
// 'dog03.png'
// 'dog04.png'
// 'dog05.png'
// 'dog06.png'

const music_offset = 0.127;
const music_speed = 60 / 125;


export default class ExampleScene3 extends Phaser.Scene {
	constructor() {
		super({key: 'ExampleScene3'});
	}

	preload() {
		this.load.audio('practice', 'src/assets/practice.ogg' );

		this.load.audio('cowbell', 'src/assets/Sample 103.wav' );
		this.load.audio('miss', 'src/assets/Sample 324.wav');
		this.load.audio('shoot_1', 'src/assets/Sample 282.wav');
		this.load.audio('shoot_2', 'src/assets/Sample 288.wav');
		this.load.audio('shoot_3', 'src/assets/Sample 289.wav');
		this.load.audio('shoot_4', 'src/assets/Sample 283.wav');
		this.load.audio('karate_kick_miss', 'src/assets/Sample 286.wav');
		this.load.audio('karate_kick_swing', 'src/assets/Sample 287.wav');
		this.load.audio('target_destroyed', 'src/assets/Sample 290.wav');
		this.load.audio('target_destroyed', 'src/assets/Sample 291.wav');
		this.load.audio('karate_bomb_kick', 'src/assets/Sample 292.wav');

		this.load.audio('boy_one', 'src/assets/Sample 692.wav');
		this.load.audio('boy_two', 'src/assets/Sample 694.wav');
		this.load.audio('boy_three', 'src/assets/Sample 693.wav');
		this.load.audio('boy_four', 'src/assets/Sample 691.wav');
		this.load.audio('girl_one', 'src/assets/Sample 758.wav');
		this.load.audio('girl_two', 'src/assets/Sample 760.wav');
		this.load.audio('girl_three', 'src/assets/Sample 759.wav');
		this.load.audio('girl_four', 'src/assets/Sample 757.wav');


		this.load.audio('70', 'src/assets/Sample 70.wav'); // audience_boo
		this.load.audio('71', 'src/assets/Sample 71.wav'); // audience_cheer
		this.load.audio('72', 'src/assets/Sample 72.wav'); // audience_clap
		this.load.audio('73', 'src/assets/Sample 73.wav'); // audience_cheer2
		this.load.audio('74', 'src/assets/Sample 74.wav'); // audience_gasp
		this.load.audio('82', 'src/assets/Sample 82.wav'); // click
		this.load.audio('103', 'src/assets/Sample 103.wav'); // cowbell
		this.load.audio('131', 'src/assets/Sample 131.wav'); // hihat
		this.load.audio('132', 'src/assets/Sample 132.wav'); // cymbal
		this.load.audio('133', 'src/assets/Sample 133.wav'); // reverse_cymbal
		this.load.audio('134', 'src/assets/Sample 134.wav'); // snare
		this.load.audio('135', 'src/assets/Sample 135.wav'); // snare2
		this.load.audio('136', 'src/assets/Sample 136.wav'); // smack
		this.load.audio('137', 'src/assets/Sample 137.wav'); // drum
		this.load.audio('138', 'src/assets/Sample 138.wav'); // swoosh
		this.load.audio('153', 'src/assets/Sample 153.wav'); // piano
		this.load.audio('201', 'src/assets/Sample 201.wav'); // error
		this.load.audio('202', 'src/assets/Sample 202.wav'); // loud_smack
		this.load.audio('203', 'src/assets/Sample 203.wav'); // shell_bounce
		this.load.audio('204', 'src/assets/Sample 204.wav'); // shells_rain
		this.load.audio('205', 'src/assets/Sample 205.wav'); // shells_rain
		this.load.audio('206', 'src/assets/Sample 206.wav'); // metal_pan
		this.load.audio('207', 'src/assets/Sample 207.wav'); // hihat
		this.load.audio('211', 'src/assets/Sample 211.wav'); // rope_swing
		this.load.audio('293', 'src/assets/Sample 293.wav'); // glass crash
		this.load.audio('295', 'src/assets/Sample 295.wav'); // shoot
		this.load.audio('296', 'src/assets/Sample 296.wav'); // smack
		this.load.audio('297', 'src/assets/Sample 297.wav'); // drum smack
		this.load.audio('298', 'src/assets/Sample 298.wav'); // smack crumble
		this.load.audio('299', 'src/assets/Sample 299.wav'); // small shoot
		this.load.audio('308', 'src/assets/Sample 308.wav'); // trampoline
		this.load.audio('309', 'src/assets/Sample 309.wav'); // gas
		this.load.audio('310', 'src/assets/Sample 310.wav'); // mechanical screw
		this.load.audio('576', 'src/assets/Sample 576.wav'); // click
		this.load.audio('577', 'src/assets/Sample 577.wav'); // "huh"
		this.load.audio('578', 'src/assets/Sample 578.wav'); // "ikuyo"
		this.load.audio('579', 'src/assets/Sample 579.wav'); // "dekaini"
		this.load.audio('580', 'src/assets/Sample 580.wav'); // "ugh"
		this.load.audio('581', 'src/assets/Sample 581.wav'); // "yo"
		this.load.audio('582', 'src/assets/Sample 582.wav'); // "see"
		this.load.audio('583', 'src/assets/Sample 583.wav'); // "hei"
		this.load.audio('584', 'src/assets/Sample 584.wav'); // "uun"
		this.load.audio('585', 'src/assets/Sample 585.wav'); // "yamete"
		this.load.audio('586', 'src/assets/Sample 586.wav'); // "fei"
		this.load.audio('587', 'src/assets/Sample 587.wav'); // "bop"
		this.load.audio('588', 'src/assets/Sample 588.wav'); // "dop"
		this.load.audio('589', 'src/assets/Sample 589.wav'); // "don"
		this.load.audio('590', 'src/assets/Sample 590.wav'); // "donn"
		this.load.audio('591', 'src/assets/Sample 591.wav'); // "dn"
		this.load.audio('592', 'src/assets/Sample 592.wav'); // "doun"
		this.load.audio('593', 'src/assets/Sample 593.wav'); // "tei"
		this.load.audio('594', 'src/assets/Sample 594.wav'); // "mmn"
		this.load.audio('595', 'src/assets/Sample 595.wav'); // "zu"
		this.load.audio('596', 'src/assets/Sample 596.wav'); // "taan"
		this.load.audio('597', 'src/assets/Sample 597.wav'); // "wuh"
		this.load.audio('598', 'src/assets/Sample 598.wav'); // "wup"
		this.load.audio('599', 'src/assets/Sample 599.wav'); // "yoh"
		this.load.audio('609', 'src/assets/Sample 609.wav'); // menu click
		this.load.audio('612', 'src/assets/Sample 612.wav'); // game over

		this.soundList = [
			'boy_one',
			'boy_two',
			'boy_three',
			'boy_four',
			'girl_one',
			'girl_two',
			'girl_three',
			'girl_four',

			'cowbell',
			'miss',
			'shoot_1',
			'shoot_2',
			'shoot_3',
			'shoot_4',
			'miss',
			'karate_kick_miss',
			'karate_kick_swing',
			'target_destroyed',
			'target_destroyed',
			'karate_bomb_kick',
		];

		this.load.image('background', 'src/assets/background.png');
		this.load.image('circle', 'src/assets/circle.png');
		this.load.spritesheet('dog', 'src/assets/dog.png', { frameWidth: 700, frameHeight: 1000 });
		this.load.spritesheet('bullet_hole', 'src/assets/bullet_hole.png', { frameWidth: 80, frameHeight: 80 });
		this.load.image('cat', 'src/assets/cat01.png');
		this.load.image('tumble', 'src/assets/tumble.png');
	}

	create() {
		this.music = this.sound.add('practice', { loop: false });
		this.music.setVolume(0.5);
		this.music.play();


		for (var i = 0; i < this.soundList.length; i++) {
			console.log();
			this[this.soundList[i]] = this.sound.add(this.soundList[i]);
			this[this.soundList[i]].setVolume(0.5);
		}
		//this.cowbell.rate = Phaser.Math.RND.realInRange(0.5, 1.5);



		// Background
		let bg = this.add.image(this.CX, this.CY, 'background');
		this.fitToScreen(bg);


		this.text = this.add.text(0, 0, "Test", { font: "40px Courier" });


		this.enemy = new Enemy(this, 650, 490);


		//Tumble
		this.tumble = this.add.sprite(-500, 460, 'tumble');
		this.tumble.startY = this.tumble.y;
		this.tumble.setScale(0.7);


		this.player = this.add.sprite(280, 570, 'dog', 0);
		this.player.setOrigin(0.5, 1.0);
		this.player.size = 0.6;
		this.player.setScale(this.player.size);
		this.player.setTint(0x7777ff);

		this.anims.create({
			key: 'equip',
			frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 2 }),
			frameRate: 10
		});
		this.anims.create({
			key: 'shoot',
			frames: [
				{key: 'dog', frame: 3, duration: 100},
				{key: 'dog', frame: 4, duration: 50},
				{key: 'dog', frame: 5, duration: 0},
			]
		});
		this.anims.create({
			key: 'smallshoot',
			frames: [
				{key: 'dog', frame: 7, duration: 50},
				{key: 'dog', frame: 8, duration: 150},
				{key: 'dog', frame: 9, duration: 0},
			]
		});
		this.anims.create({
			key: 'unequip',
			frames: [
				{key: 'dog', frame: 1, duration: 50},
				{key: 'dog', frame: 0, duration: 0},
			]
		});
		this.anims.create({
			key: 'miss',
			frames: [
				{key: 'dog', frame: 11, duration: 50},
				{key: 'dog', frame: 12, duration: 0},
			]
		});
		//this.player.play('equip');


		this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.keySpace.on('down', this.onShoot, this);

		this.input.on('pointerdown', function(pointer) {
			this.onShoot(pointer);
		}, this);

		this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		this.keyR.on('down', function() {
			this.music.stop();
			this.music.play();
		}, this);
	}

	update(time, delta) {
		this.player.scaleY += (this.player.size - this.player.scaleY) * 0.1;
		this.enemy.scaleY += (this.enemy.size - this.enemy.scaleY) * 0.1;

		let bar = this.getBar();

		this.text.setText(bar);

		if (bar > 0 && this.prevBar != bar) {
			this.onBeat(bar);
		}
		this.prevBar = bar;

		//this.enemy.hit(this, 0.5);
		this.enemy.update(this.getMusicTime());

		this.tumble.angle += 3;
		this.tumble.y = this.tumble.startY - 50 * Math.abs(Math.cos(this.getMusicTime() * Math.PI / 2));
		this.tumble.x += 5;
		if (this.tumble.x > this.W+500) {
			this.tumble.x = -500;
		}

		this.enemy.sprite.rotateX(this.getMusicTime());
	}


	getMusicTime() {
		const music_offset = 0.127;
		const music_speed = 60 / 125;

		let time = this.music.getCurrentTime() + music_speed - music_offset;
		return time / music_speed;
	}

	getBar() {
		const music_offset = 0.127;
		const music_speed = 60 / 125;

		let time = this.music.getCurrentTime() + music_speed - music_offset;
		return Math.floor(time / music_speed);
	}

	getBarTime() {
		const music_offset = 0.127;
		const music_speed = 60 / 125;

		let time = this.music.getCurrentTime() + music_speed - music_offset;
		return (time % music_speed) / music_speed;
	}

	getAccuracy() {
		const music_offset = 0.127;
		const music_speed = 60 / 125;
		const input_delay = 0 * 0.155;

		let time = (0.5 + this.getBarTime() - input_delay) % 1;
		return time - 0.5;
	}

	getRating(accuracy) {
		if (accuracy > 0) {
			if (accuracy < 0.05)	return 'perfect';
			if (accuracy < 0.11)	return 'good';
			if (accuracy < 0.18)	return 'ok';
			if (accuracy < 0.28)	return 'bad';
		}
		else {
			if (accuracy > -0.05)	return 'perfect';
			if (accuracy > -0.11)	return 'good';
			if (accuracy > -0.18)	return 'ok';
			if (accuracy > -0.28)	return 'bad';
		}
		return 'miss';
	}


	onBeat(bar) {
		this.player.scaleY *= 0.95;
		this.enemy.scaleY *= 0.95;

		//[this.girl_one, this.girl_two, this.girl_three, this.girl_four][(this.getBar()-1)%4].play();
		//this.cowbell.play();

		if (this.player.holsterTime == bar) {
			this.player.play('unequip');
			this.karate_kick_swing.play();
		}

		//this.shoot_2.play();
		//this.shoot_4.play();
		//this.karate_kick_miss.play();
		//this.target_destroyed.play();
		//this.target_destroyed.play();
		//this.karate_bomb_kick.play();
	}

	onShoot(event) {
		let accuracy = this.getAccuracy();
		let rating = this.getRating(accuracy);

		if (rating == 'miss') {
			this.player.play('miss');
			this.miss.play();
		}
		else {
			this.player.play('smallshoot');
			this.enemy.hit(this, rating);
			if (rating == 'perfect' || rating == 'good') {
				this.shoot_3.play();
			}
			else {
				this.shoot_2.play();
			}
		}

		// Cooldown until holsting the gun
		//console.log('HIT', this.getBar);
		this.player.holsterTime = Math.ceil(this.getMusicTime() + 1.25);
		//console.log(this.getMusicTime(), this.player.holsterTime);


		//this.player.setTexture('dog_shoot');
		//var timer = this.time.delayedCall(150, function() {
		//	this.player.setTexture('dog');
		//}, null, this);
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}