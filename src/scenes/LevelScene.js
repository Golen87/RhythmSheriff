import Enemy from "./../components/Enemy.js";
import Music from "./../components/Music.js";
import DialogueBox from "./../components/DialogueBox.js";

export default class LevelScene extends Phaser.Scene {
	constructor() {
		super({key: 'LevelScene'});
	}

	create() {
		this.cameras.main.fadeEffect.start(false, 500, 0x11, 0x11, 0x11);
		// 500 til skip text
		// 500 til talk text

		this.music = new Music(this, 'bgm_practice', { volume: 0.5 });
		//this.music.play();

		this.music.once('complete', this.onLevelComplete, this);

		this.music.on('beat', function(bar) {
			this.onBeat(bar);
		}, this);


		this.soundList = [
			//'boy_one',
			//'boy_two',
			//'boy_three',
			//'boy_four',
			'girl_one',
			'girl_two',
			'girl_three',
			'girl_four',
			'audience_boo',
			'audience_gasp',
			'audience_clap',
			'audience_cheer',
			'audience_cheer2',

			'cowbell',
			'miss',
			'shoot_1',
			'shoot_2',
			'shoot_3',
			'shoot_4',
			'miss',
			'karate_kick_miss',
			'karate_kick_swing',
			'target_destroyed_1',
			'target_destroyed_2',
			'karate_bomb_kick',
			'fade_out',
			'robot_eject',
			'robot_withdraw',
			'flip',
			'destroy_pieces',

			'Back',
			'ButtonDown',
			'ButtonUp',
			'Clap',
			'ClickHigh',
			'ClickLow',
			'Cowbell',
			'Crow',
			'Keypress',
			'MinigameClose',
			'MinigameHover',
			'MinigameLaunch',
			'MinigameOpen',
			'MinigameWindow',
			'Miss2',
			'Miss3',
			'Miss4',
			'Miss',
			'Nature',
			'Page',
			'Punch',
			'RatingOK',
			'Results1',
			'Results2',
			'Shrink',
			'TapDown',
			'TapUp',
			'Woodblock2',
			'Woodblock',
		];
		for (var i = 0; i < this.soundList.length; i++) {
			this[this.soundList[i]] = this.sound.add(this.soundList[i], { volume: 0.5 });
		}
		this.flip.rate = 0.5;//Phaser.Math.RND.realInRange(0.5, 1.5);
		this.robot_withdraw.setVolume(0.3);
		this.robot_eject.setVolume(0.3);


		/* Graphics */

		// Background
		let bg = this.add.image(this.CX, this.CY, 'background');
		this.fitToScreen(bg);

		this.text = this.add.text(0, 0, "Test", { font: "40px Courier" });

		this.wood_back = this.add.sprite(650, 490, 'wood_back');
		this.wood_back.setScale(0.25);
		this.wood_back.setTint(0x936b48);

		this.enemy = new Enemy(this, 650, 490);

		this.wood_block = this.add.sprite(650, 490, 'wood_block');
		this.wood_block.setOrigin(0.53, 0.02);
		this.wood_block.setScale(0.25);
		this.wood_block.setTint(0xaf825b);

		this.wood_front = this.add.sprite(650, 490, 'wood_front');
		this.wood_front.setScale(0.25);
		this.wood_front.setTint(0x936b48);

		// Tumble
		this.tumble = this.add.sprite(-500, 460, 'tumble');
		this.tumble.startY = this.tumble.y;
		this.tumble.setScale(0.7);

		// Player
		this.player = new Player(this, 280, 570);


		/* Input */

		if (!this._listeners) {
			this._listeners = true;

			let keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
			keySpace.on('down', this.onTapDown, this);
			keySpace.on('up', this.onTapUp, this);
			this.input.on('pointerdown', this.onTapDown, this);
			this.input.on('pointerup', this.onTapUp, this);

			this.input.keyboard.on('keydown-S', this.onSkipDown, this);
			this.input.keyboard.on('keyup-S', this.onSkipUp, this);
		}


		/* Tutorial */

		this.dialogueBox = new DialogueBox(this, 680, 200, 500, 240);
		this.dialogueBox.setAlpha(0);

		this.dialogueList = [
			"Magna pariatur anim dolore tempor.",
			"Dolore dolore ad elit. Lorem ipsum duis elit veniam non.",
			"Lorem ipsum minim est excepteur labore esse et duis consectetur culpa minim occaecat.",
		];

		this.addEvent(1200, this.progress);
	}


	update(time, delta) {
		this.player.scaleY += (this.player.size - this.player.scaleY) * 0.1;
		this.enemy.scaleY += (this.enemy.size - this.enemy.scaleY) * 0.1;

		this.text.setText(this.music.getBar());

		let barTime = this.music.getBarTime();
		let deltaBarTime = barTime - this.lastBarTime || 0;
		this.lastBarTime = barTime;

		//this.enemy.hit(this, 0.5);
		this.enemy.update(barTime, deltaBarTime);

		this.tumble.angle += 3;
		this.tumble.y = this.tumble.startY - 50 * Math.abs(Math.cos(barTime * Math.PI / 2));
		this.tumble.x += 5;
		if (this.tumble.x > this.W+500) {
			this.tumble.x = -500;
		}

		//this.enemy.sprite.rotateX(this.music.getBarTime());
	}



	addEvent(delay, callback, callbackScope=this) {
		return this.time.addEvent({delay, callback, callbackScope});
	}


	getAccuracy() {
		const input_delay = 0 * 0.155;

		let inBar = this.music.getBarTime() % 1;
		let time = (0.5 + inBar - input_delay) % 1;
		return time - 0.5;
	}

	getRating(accuracy) {
		if (accuracy > 0) {
			if (accuracy < 0.05)	return 'perfect';
			if (accuracy < 0.10)	return 'good';
			if (accuracy < 0.15)	return 'ok';
			//if (accuracy < 0.45)	return 'bad';
		}
		else {
			if (accuracy > -0.05)	return 'perfect';
			if (accuracy > -0.10)	return 'good';
			if (accuracy > -0.15)	return 'ok';
			//if (accuracy > -0.45)	return 'bad';
		}
		return 'bad';
	}


	onBeat(bar) {
		this.player.scaleY *= 0.95;
		this.enemy.scaleY *= 0.95;

		this.enemy.onBeat(bar);

		//[this.girl_one, this.girl_two, this.girl_three, this.girl_four][(this.music.getBar()-1)%4].play();
		//this.cowbell.play();

		if (this.player.holsterTime == bar) {
			this.player.holsterTime = -1;
			this.player.play('unequip');
			this.karate_kick_swing.play();
		}

		if (bar == 24) {
			this.progress();
		}

		//this.shoot_2.play();
		//this.shoot_4.play();
		//this.karate_kick_miss.play();
		//this.target_destroyed.play();
		//this.target_destroyed.play();
		//this.karate_bomb_kick.play();
	}

	onTapDown(event) {
		if (this.music.isPlaying) {
			this.onShoot();
		}
		else {
			this.dialogueBox.tapDown();
		}
	}

	onTapUp(event) {
		if (this.music.isPlaying) {
		}
		else {
			let success = this.dialogueBox.tapUp();
			if (success) {
				this.addEvent(500, this.progress);
			}
		}
	}

	onSkipDown(event) {
		this.ButtonDown.play();
	}

	onSkipUp(event) {
		this.ButtonUp.play();
	}

	progress() {
		if (this.music.isPlaying) {
			this.music.stop();
			//this.audience_boo.play();
			//this.audience_gasp.play();
			this.audience_clap.play();
			//this.audience_cheer.play();
			//this.audience_cheer2.play();

			this.addEvent(2000, this.onLevelComplete);
		}
		else if (this.dialogueList.length > 0) {
			this.dialogueBox.show(this.dialogueList.shift());
		}
		else {
			this.music.play();
		}
	}

	onShoot() {
		let accuracy = this.getAccuracy();
		let rating = this.getRating(accuracy);

		if (!this.enemy.canHit()) {
			rating = 'miss';
		}

		if (rating == 'miss') {
			this.player.play('small_shoot_miss');
			this.shoot_1.play();
			this.miss.play();
		}
		else {
			let isGoodShot = (rating == 'perfect' || rating == 'good');
			let isBigShot = this.enemy.isThreat();

			if (isBigShot) {
				if (isGoodShot) {
					this.player.play('big_shoot');
					this.shoot_3.play();
				}
				else {
					this.player.play('big_shoot_miss');
					this.shoot_2.play();
					this.miss.play();
				}
			}
			else {
				this.player.play('small_shoot');
				this.shoot_1.play();
			}

			this.enemy.hit(this, rating);
		}

		// Cooldown until holsting the gun
		this.player.holsterTime = Math.ceil(this.music.getBarTime() + 1.25) % this.music.maxBar;
	}

	onLevelComplete() {
		this.cameras.main.fadeEffect.start(true, 500, 0x11, 0x11, 0x11);
		this.addEvent(500, function() {
			this.music.stop();
			this.scene.start("EvaluationScene", {rating: 'good'});
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