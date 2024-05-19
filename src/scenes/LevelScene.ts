import BaseScene from "./BaseScene";
import Player from "@/components/Player";
import Enemy from "@/components/Enemy";
import Enemy2 from "@/components/Enemy2";
import Music from "@/components/Music";
import Sound from "@/components/Sound";
import DialogueBox from "@/components/DialogueBox";
import RoundRectangle from "phaser3-rex-plugins/plugins/gameobjects/shape/roundrectangle/RoundRectangle";

export default class LevelScene extends BaseScene {
	private practiceMusic: Music;
	private levelMusic: Music;

	private currentMusic: Music | null;
	private ButtonDown: Sound;
	private ButtonUp: Sound;
	private shoot_1: Sound;
	private shoot_2: Sound;
	private shoot_3: Sound;
	private miss: Sound;
	private audienceClap: Sound;
	private robotEject: Sound;
	private catCue: Sound;
	private ratCue: Sound;

	private background: Phaser.GameObjects.Image;
	private tumbleBg: Phaser.GameObjects.Sprite;
	private tumbleBgStartY: number;
	private tumbleFg: Phaser.GameObjects.Sprite;
	private tumbleFgStartY: number;
	private woodBack: Phaser.GameObjects.Sprite;
	private dummy: Enemy;
	private enemies: (Enemy | Enemy2)[];
	private wood_block: Phaser.GameObjects.Image;
	private wood_front: Phaser.GameObjects.Image;
	private player: Player;
	private graphics: Phaser.GameObjects.Graphics;
	private dialogueBox: DialogueBox;
	private dialogueList: string[];
	private eventMaxRange: number;
	private scores: ("perfect" | "good" | "ok" | "bad" | "miss")[];
	private progress: string | null;
	private practiceCount: number;
	private canSkip: boolean;
	private blockTap: boolean;
	private lastBarTime: number;
	private invert: boolean;
	private skipText: Phaser.GameObjects.Text;
	private cues: { [key: number]: string };

	constructor() {
		super({ key: "LevelScene" });
	}

	create() {
		this.fade(false, 500, 0x111111);

		if (!this.practiceMusic) {
			this.practiceMusic = new Music(this, "bgm_practice", { volume: 0.5 });
			// this.practiceMusic.rate = 105/125;
			this.practiceMusic.rate = 115 / 125;

			this.practiceMusic.on("complete", this.onLevelComplete, this);
			this.practiceMusic.on("bar", this.onBar, this);
			this.practiceMusic.on("beat", this.onBeat, this);
		}

		if (!this.levelMusic) {
			// this.levelMusic = new Music(this, 'puppywestern_2_nocues', { volume: 0.5 });
			// this.levelMusic = new Music(this, 'samurai_slice', { volume: 0.4 });
			this.levelMusic = new Music(this, "tapatio", { volume: 0.4 });

			this.levelMusic.on("complete", this.onLevelComplete, this);
			this.levelMusic.on("bar", this.onBar, this);
			this.levelMusic.on("beat", this.onBeat, this);
		}

		this.currentMusic = null;

		this.ButtonDown = new Sound(this, "ButtonDown", {
			volume: 0.5,
		});
		this.ButtonUp = new Sound(this, "ButtonUp", {
			volume: 0.5,
		});
		this.shoot_1 = new Sound(this, "shoot_1", {
			volume: 0.5,
		});
		this.shoot_2 = new Sound(this, "shoot_2", {
			volume: 0.5,
		});
		this.shoot_3 = new Sound(this, "shoot_3", {
			volume: 0.5,
		});
		this.miss = new Sound(this, "miss", {
			volume: 0.5,
		});
		this.audienceClap = new Sound(this, "audience_clap", {
			volume: 0.5,
		});
		//this.robot_eject.setVolume(0.5);
		//this.robot_withdraw.setVolume(0.3);

		this.robotEject = new Sound(this, "robot_eject", { volume: 0.5 });
		this.catCue = new Sound(this, "cat_cue", { volume: 1.0 });
		this.ratCue = new Sound(this, "rat_cue", { volume: 1.0 });

		/* Graphics */

		// Background
		this.background = this.add.image(this.CX, this.CY, "background");
		this.fitToScreen(this.background);

		// Tumble background
		this.tumbleBg = this.add.sprite(1500, 440, "tumble");
		this.tumbleBgStartY = this.tumbleBg.y;
		this.tumbleBg.setScale(0.55);

		this.woodBack = this.add.sprite(650, 490, "wood_back");
		this.woodBack.setScale(0.25);
		this.woodBack.setTint(0x936b48);

		this.dummy = new Enemy(this, 680, 490, "cat");
		this.enemies = [
			new Enemy(this, 650, 490, "cat"),
			new Enemy(this, 650, 490, "cat"),
			new Enemy(this, 650, 490, "cat"),
			new Enemy(this, 650, 490, "cat"),
			new Enemy2(this, 650, 490, "rat"),
			new Enemy2(this, 650, 490, "rat"),
			new Enemy2(this, 650, 490, "rat"),
			new Enemy2(this, 650, 490, "rat"),
		];
		this.enemies.forEach((enemy) => {
			enemy.on("score", this.onScore, this);
			enemy.on("playCatCue", () => {
				this.robotEject.play();
				this.catCue.play();
				console.log(this.currentMusic!.barTime);
			});
			enemy.on("playRatCue", () => {
				this.robotEject.play();
				this.ratCue.play();
				console.log(this.currentMusic!.barTime);
			});
		});

		this.wood_block = this.add.sprite(650, 490, "wood_block");
		this.wood_block.setOrigin(0.53, 0.02);
		this.wood_block.setScale(0.25);
		this.wood_block.setTint(0xaf825b);
		this.wood_block.setDepth(100);

		this.wood_front = this.add.sprite(650, 490, "wood_front");
		this.wood_front.setScale(0.25);
		this.wood_front.setTint(0x936b48);
		this.wood_front.setDepth(100);

		// Tumble foreground
		this.tumbleFg = this.add.sprite(1500, 470, "tumble");
		this.tumbleFgStartY = this.tumbleFg.y;
		this.tumbleFg.setScale(0.8);
		this.tumbleFg.setDepth(100);

		// Foreground
		let fg = this.add.image(this.CX, this.CY, "foreground");
		fg.setDepth(100);
		this.fitToScreen(fg);

		// Player
		this.player = new Player(this, 280, 570);
		this.player.setDepth(100);

		this.graphics = this.add.graphics();
		this.graphics.setDepth(200);
		this.graphics.fillGradientStyle(
			0xc56000,
			0xc56000,
			0xffd54f,
			0xffd54f,
			0.8,
			0.8,
			0.5,
			0.5
		);
		this.graphics.setAlpha(0.0);
		this.graphics.fillRect(0, 0, this.W, this.H);

		/* Input */

		this.setupInput();

		/* Tutorial */

		this.dialogueBox = new DialogueBox(this, 680, 200, 500, 240);
		this.dialogueBox.setAlpha(0);
		this.dialogueBox.setDepth(1000);

		this.dialogueList = [];

		this.cues = {};
		this.eventMaxRange = 1;
		this.scores = [];

		this.progress = null;
		this.practiceCount = 0;
		this.canSkip = false;
		this.blockTap = false;

		this.addEvent(700, this.showSkip);
		this.addEvent(1200, this.showDummy);
		this.addEvent(1200 + 1000, this.onProgress);
	}

	update(time: number, delta: number) {
		if (this.currentMusic) {
			let barTime = this.currentMusic.getBarTime();
			let deltaBarTime = barTime - this.lastBarTime;
			this.lastBarTime = barTime;

			this.player.update(barTime, deltaBarTime);

			this.enemies.forEach((enemy) => {
				enemy.update(barTime, deltaBarTime);
			});
		} else {
			this.player.update(0, 0);

			this.enemies.forEach((enemy) => {
				enemy.update(0, 0);
			});
		}

		this.tumbleBg.angle += ((4 * delta) / 1000) * 60;
		this.tumbleBg.x += ((5 * delta) / 1000) * 60;
		if (this.currentMusic) {
			this.tumbleBg.y =
				this.tumbleBgStartY -
				40 * Math.abs(Math.cos((this.currentMusic.getBarTime() * Math.PI) / 2));
			if (this.tumbleBg.x > this.W + 500) {
				this.tumbleBg.x = -500;
			}
		}

		this.tumbleFg.angle += ((6 * delta) / 1000) * 60;
		this.tumbleFg.x += ((7 * delta) / 1000) * 60;
		if (this.currentMusic) {
			this.tumbleFg.y =
				this.tumbleFgStartY -
				50 * Math.abs(Math.sin((this.currentMusic.getBarTime() * Math.PI) / 2));
			if (this.tumbleFg.x > this.W + 1500) {
				this.tumbleFg.x = -1500;
			}
		}

		this.blockTap = false;
	}

	setupInput() {
		if (this.input.keyboard) {
			let keySpace = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.SPACE
			);
			keySpace.on("down", this.onTapDown, this);
			keySpace.on("up", this.onTapUp, this);

			let keySkip = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.S
			);
			keySkip.on("down", this.onSkipDown, this);
			keySkip.on("up", this.onSkipUp, this);

			let keyBack = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.B
			);
			keyBack.on(
				"down",
				() => {
					if (this.currentMusic) this.currentMusic.seek -= 4;
				},
				this
			);
			let keyForward = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.F
			);
			keyForward.on(
				"down",
				() => {
					if (this.currentMusic) this.currentMusic.seek += 4;
				},
				this
			);
		}

		this.input.on("pointerdown", this.onTapDown, this);
		this.input.on("pointerup", this.onTapUp, this);
	}

	playMusic(music: Music) {
		this.currentMusic = music;
		this.currentMusic.play();
		// this.currentMusic.seek = 180 / (this.currentMusic.bpm/60);
		this.lastBarTime = this.currentMusic.getBarTime();
		let rate = (this.currentMusic.rate * this.currentMusic.bpm) / 143;
		// this.robotEject.setRate(rate);
		this.catCue.setRate(rate);
		this.ratCue.setRate(rate);
	}

	findAvailableEnemy(type: string) {
		for (var i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].isHiding && this.enemies[i].type == type) {
				return this.enemies[i];
			}
		}
		console.error("No enemy found.");
	}

	onBar(bar: number) {
		this.player.onBar(bar);

		this.enemies.forEach((enemy) => {
			enemy.onBar(bar);
		});

		if (this.currentMusic == this.practiceMusic) {
			if (this.practiceCount <= 0) {
				this.onProgress();
			}
		}
	}

	onBeat(time: number) {
		this.player.onBeat(time);

		if (!this.currentMusic) {
			return;
		}

		let catCheckTime = (time + 2) % this.eventMaxRange;
		let ratCheckTime = (time + 1.5) % this.eventMaxRange;
		let spinCheckTime = (time + 0) % this.eventMaxRange;

		if (this.cues[catCheckTime] == "cat") {
			let enemy = this.findAvailableEnemy("cat");
			if (enemy) {
				this.invert = !this.invert; // Temporary
				enemy.appear(time, this.invert, this.currentMusic.maxBar);
				enemy.setDepth(10 + time / 1000);
			}
		}
		if (this.cues[ratCheckTime] == "rat") {
			let enemy = this.findAvailableEnemy("rat");
			if (enemy) {
				this.invert = !this.invert; // Temporary
				enemy.appear(time, this.invert, this.currentMusic.maxBar);
				enemy.setDepth(10 + time / 1000);
			}
		}
		if (this.cues[spinCheckTime] == "spin") {
			this.player.play("spin");
		}
		if (this.cues[spinCheckTime] == "stop") {
			this.player.play("unequip");
		}

		// if (this.cues[catCheckTime-0.0] == 'cat')
		// 	this.girl_three.play();
		// if (this.cues[catCheckTime-1.0] == 'cat')
		// 	this.girl_two.play();
		// if (this.cues[catCheckTime-2.0] == 'cat')
		// 	this.girl_one.play();

		// if (this.cues[ratCheckTime-0.0] == 'rat')
		// 	this.girl_four.play();
		// if (this.cues[ratCheckTime-0.5] == 'rat')
		// 	this.girl_three.play();
		// if (this.cues[ratCheckTime-1.0] == 'rat')
		// 	this.girl_two.play();
		// if (this.cues[ratCheckTime-1.5] == 'rat')
		// 	this.girl_one.play();

		this.enemies.forEach((enemy) => {
			enemy.onBeat(time);
		});
	}

	onTapDown() {
		if (this.blockTap) return;

		if (this.currentMusic && this.currentMusic.isPlaying) {
			this.onShoot();
		} else {
			this.dialogueBox.tapDown();
		}
	}

	onTapUp() {
		if (this.blockTap) return;

		if (this.currentMusic && this.currentMusic.isPlaying) {
		} else {
			let success = this.dialogueBox.tapUp();
			if (success) {
				if (this.dialogueList.length == 0) {
					this.addEvent(200, this.hideDummy);
				}
				this.addEvent(500, this.onProgress);
			}
		}
	}

	onSkipDown() {
		if (this.canSkip) {
			this.blockTap = true;
			this.ButtonDown.play();
		}
	}

	onSkipUp() {
		if (this.canSkip) {
			this.blockTap = true;
			this.ButtonUp.play();

			this.progress = "end_text";
			this.hideSkip();
			this.dialogueBox.disableInput();

			if (this.currentMusic) {
				this.currentMusic.stop();
				this.currentMusic = null;
			}

			this.fade(true, 100, 0x111111);
			this.addEvent(1000, () => {
				this.dialogueList = [];
				this.dialogueBox.hide();
				this.hideDummy(true);
				this.fade(false, 100, 0x111111);
			});
			this.addEvent(2000, this.onProgress);
		}
	}

	showSkip() {
		this.canSkip = true;

		//this.skipBox = this.add.rexRoundRectangle(10, this.H-35, 200, 50, 25, 0xffffff);
		//this.skipBox.setOrigin(0, 0.5);
		//this.skipBox.setAlpha(0.3);

		this.skipText = this.addText({
			x: 10,
			y: this.H - 10,
			text: "[S] skip practice",
			size: 25,
			weight: 700,
			color: "white",
		});
		this.skipText.setDepth(1000);
		this.skipText.setOrigin(0, 1);
		this.skipText.setAlpha(0.5);

		this.skipText.setInteractive();
		this.skipText.on("pointerdown", this.onSkipDown, this);
		this.skipText.on("pointerup", this.onSkipUp, this);

		// this.onSkipDown();
		// this.onSkipUp();
	}

	hideSkip() {
		this.canSkip = false;
		//this.skipBox.setAlpha(0);
		this.skipText.setAlpha(0);
	}

	showDummy() {
		if (this.dummy.isHiding) {
			this.dummy.isHiding = false;
			this.tweens.add({
				targets: this.dummy,
				y: {
					from: this.dummy.startY + this.dummy.hideDist,
					to: this.dummy.startY + 130,
				},
				ease: (v: number) => {
					return Phaser.Math.Easing.Elastic.Out(v, 1.0, 1.0);
				},
				duration: 700,
			});
		}
	}

	hideDummy(instant = false) {
		if (instant) {
			this.dummy.setVisible(false);
		} else if (!this.dummy.isHiding) {
			this.dummy.isHiding = true;
			this.tweens.add({
				targets: this.dummy,
				y: {
					from: this.dummy.startY + this.dummy.hideDist - 110,
					to: this.dummy.startY + this.dummy.hideDist,
				},
				ease: "Cubic.In",
				duration: 200,
			});
		}
	}

	getClosestEnemy(time: number) {
		let record = null;
		let enemy = null;
		for (var i = this.enemies.length - 1; i >= 0; i--) {
			if (this.enemies[i].canHit(time)) {
				let dist = Math.abs(this.enemies[i].targetTime - time);
				if (record === null || dist < record) {
					record = dist;
					enemy = this.enemies[i];
				}
			}
		}
		return enemy;
	}

	getRating(accuracy: number): "perfect" | "good" | "ok" | "bad" {
		if (accuracy > 0) {
			if (accuracy < 0.05) return "perfect";
			if (accuracy < 0.12) return "good";
			if (accuracy < 0.25) return "ok";
			//if (accuracy < 0.48)	return 'bad';
		} else {
			if (accuracy > -0.05) return "perfect";
			if (accuracy > -0.12) return "good";
			if (accuracy > -0.25) return "ok";
			//if (accuracy > -0.98)	return 'bad';
		}
		return "bad";
	}

	onShoot() {
		if (!this.currentMusic) return;

		let time = this.currentMusic.getBarTime();
		let enemy = this.getClosestEnemy(time);

		// console.log(Math.round(time*4)/4);

		if (enemy) {
			let delta = Math.abs(enemy.targetTime - time);
			let rating = this.getRating(delta);

			if (enemy.isHit) {
				rating = "bad";
			}

			enemy.hit(rating);

			if (rating == "perfect") {
				this.player.play("big_shoot");
				this.shoot_3.play();
			} else if (rating == "good") {
				this.player.play("big_shoot");
				this.shoot_2.play();
			} else if (rating == "ok") {
				this.player.play("big_shoot_miss");
				this.shoot_2.play();
			} else {
				this.player.play("small_shoot_miss");
				this.shoot_1.play();
				this.miss.play();
			}
		} else {
			this.player.play("small_shoot_miss");
			this.shoot_1.play();
			this.miss.play();
		}

		// Cooldown until holsting the gun
		// this.player.holsterTime = Math.ceil(this.currentMusic.getBarTime() + 0.75) % this.currentMusic.maxBar;
		this.player.holsterTime =
			(Math.round((this.currentMusic.getBarTime() + 1.4) * 1) / 1) %
			this.currentMusic.maxBar;
	}

	onProgress() {
		// Practice music is playing
		if (this.currentMusic && this.currentMusic.isPlaying) {
			if (this.currentMusic == this.practiceMusic) {
				this.currentMusic.stop();
				this.currentMusic = null;

				this.audienceClap.play();
				this.addEvent(1000, this.showDummy);
				this.addEvent(1000 + 1000, this.onProgress);
			} else {
				console.warn("Failed onProgress");
			}
		}
		// Proceed with dialogue if it exists
		else if (this.dialogueList.length > 0) {
			this.dialogueBox.show(this.dialogueList.shift());
		}
		// New progression
		else {
			if (!this.progress) {
				this.progress = "cat_text";
				this.dialogueList = [
					// "Today we're practicing target shooting.",
					"In a duel, you must match your opponent's speed.",
					"When your opponent draws their weapon...\nstrike back!",
				];
				this.onProgress();
			} else if (this.progress == "cat_text") {
				this.progress = "practice_cat";

				this.cues = {
					6: "cat",
					14: "cat",
				};
				this.eventMaxRange = 16;
				this.practiceCount = 3;

				this.playMusic(this.practiceMusic);
			} else if (this.progress == "practice_cat") {
				this.progress = "rat_text";
				this.dialogueList = [
					"Not bad!",
					"Your next target is faster.\nTry to keep up.",
				];
				this.onProgress();
			} else if (this.progress == "rat_text") {
				this.progress = "practice_rat";

				this.cues = {
					6: "rat",
					14: "rat",
				};
				this.eventMaxRange = 16;
				this.practiceCount = 3;

				this.playMusic(this.practiceMusic);
			} else if (this.progress == "practice_rat") {
				this.progress = "cat_and_rat_text";
				this.dialogueList = [
					"You've got it!",
					"Fast targets may\nthrow off your groove.\nPay attention.",
				];
				this.onProgress();
			} else if (this.progress == "cat_and_rat_text") {
				this.progress = "practice_cat_and_rat";

				this.cues = {
					[4.0]: "cat",
					[6.5]: "rat",
					[11.0]: "cat",
					[14.5]: "rat",
				};
				this.eventMaxRange = 16;
				this.practiceCount = 3;

				this.playMusic(this.practiceMusic);
			} else if (this.progress == "practice_cat_and_rat") {
				this.progress = "end_text";
				this.dialogueList = [
					"Wow. You're the real deal!",
					"It's time to duel...\nGood luck, sheriff.",
				];
				this.onProgress();
			} else if (this.progress == "end_text") {
				this.progress = "level";
				this.cues = {
					// Sheriff song
					// 6: 'cat', 10: 'cat', 14: 'cat', 18: 'rat',
					// 22: 'cat', 26: 'cat', 31: 'cat', 35: 'rat',
					// 38: 'cat', 42: 'cat', 46: 'cat', 47: 'cat', 51: 'cat',
					// 54: 'rat', 58: 'rat', 62: 'cat', 63: 'cat', 66: 'rat',
					// 70: 'cat', 74: 'cat', 78: 'rat', 80.5: 'rat',
					// 86: 'cat', 91: 'rat', 94: 'cat', 98: 'cat', 99: 'cat',
					// 102.5: 'rat', 106: 'cat', 110.5: 'rat', 114: 'cat',
					// 119: 'rat', 122: 'cat', 123: 'cat', 127.5: 'rat', 130: 'cat', 131: 'cat',
					// 135: 'cat', 138: 'cat', 139: 'cat', 143: 'rat', 145.5: 'rat', 148: 'rat', 151: 'cat', 152: 'cat', 155: 'cat', 156: 'cat', 160: 'cat'

					// Intro
					[8 + 2]: "cat",
					[8 + 6]: "cat",
					[8 + 10]: "cat",
					[8 + 15]: "cat",

					// Part A
					[24 + 3.0]: "cat",
					[24 + 7.0]: "cat",
					[24 + 11.5]: "rat",
					[24 + 15.0]: "cat",
					[24 + 19.0]: "cat",
					[24 + 23.0]: "cat",
					[24 + 27.5]: "rat",
					[24 + 31.0]: "cat",

					// Part B
					[56 + 0.0]: "spin",
					[56 + 1.0]: "cat",
					[56 + 2.0]: "spin",
					[56 + 3.0]: "cat",
					[56 + 4.0]: "spin",
					[56 + 5.0]: "cat",
					[56 + 6.0]: "spin",
					[56 + 7.0]: "cat",
					[56 + 8.0]: "spin",
					[56 + 9.0]: "cat",
					[56 + 11.5]: "rat",
					[56 + 14.0]: "rat",
					[56 + 17.0]: "cat",
					[56 + 18.0]: "spin",
					[56 + 19.0]: "cat",
					[56 + 20.0]: "spin",
					[56 + 21.0]: "cat",
					[56 + 22.0]: "spin",
					[56 + 23.0]: "cat",
					[56 + 24.0]: "spin",
					[56 + 25.0]: "cat",
					[56 + 27.5]: "rat",
					[56 + 29.0]: "cat",
					[56 + 30.0]: "spin",
					[56 + 31.0]: "rat",

					// Part D1
					[88 + 1.5]: "rat",
					[88 + 4.5]: "rat",
					[88 + 8.0]: "cat",
					[88 + 9.5]: "rat",
					[88 + 12.5]: "rat",
					[88 + 16.0]: "cat",
					[88 + 17.5]: "rat",
					[88 + 19.0]: "rat",
					[88 + 20.5]: "rat",
					[88 + 23.0]: "cat",
					[88 + 25.0]: "rat",
					[88 + 27.5]: "rat",
					[88 + 30.0]: "rat",

					// Part D2
					[120 - 1.0]: "spin",
					[120 + 0.0]: "cat",
					[120 + 1.5]: "rat",
					[120 + 3.0]: "rat",
					[120 + 4.5]: "rat",
					[120 + 8.0]: "cat",
					[120 + 9.5]: "rat",
					[120 + 11.0]: "rat",
					[120 + 12.5]: "rat",
					[120 + 16.0]: "cat",
					[120 + 18.0]: "rat",
					[120 + 20.5]: "rat",
					[120 + 23.0]: "cat",
					[120 + 25.5]: "rat",
					[120 + 27.0]: "rat",
					[120 + 29.0]: "rat",

					// Part A
					[152 - 2.0]: "spin",
					[152 + 0.0]: "cat",
					[152 + 3.0]: "cat",
					[152 + 7.0]: "cat",
					[152 + 11.5]: "rat",
					[152 + 13.0]: "rat",
					[152 + 15.0]: "cat",
					[152 + 19.0]: "cat",
					[152 + 23.0]: "cat",
					[152 + 25.0]: "rat",
					[152 + 27.5]: "rat",
					[152 + 29.0]: "rat",
					[152 + 31.0]: "cat",
					[152 + 32.0]: "spin",
					[152 + 35.0]: "stop",

					// Outro (184)
				};
				this.eventMaxRange = 9999;

				this.scores = [];

				this.hideSkip();

				this.playMusic(this.levelMusic);
			}
		}
	}

	onScore(rating: "perfect" | "good" | "ok" | "bad" | "miss", special = false) {
		if (this.currentMusic == this.practiceMusic) {
			if (rating == "good" || rating == "perfect") {
				// Only count rats during third practice
				if (this.progress == "practice_cat_and_rat" && !special) {
					return;
				}

				this.practiceCount -= 1;
			}
		} else if (this.currentMusic == this.levelMusic) {
			this.scores.push(rating);
		}
	}

	onLevelComplete() {
		let count = { perfect: 0, good: 0, ok: 0, bad: 0, miss: 0 };
		let total = 0;
		this.scores.forEach((rating) => {
			count[rating] += 1;
			total += 1;
		});
		console.log(count);
		console.log(total);

		let rating = "bad";

		if (count["ok"] == 0 && count["bad"] == 0 && count["miss"] == 0) {
			rating = "perfect";
		} else if (count["ok"] < 6 && count["bad"] + count["miss"] < 3) {
			rating = "great";
		} else if (count["bad"] < 6 && count["miss"] < 3) {
			rating = "good";
		}

		this.fade(true, 500, 0x111111);
		this.addEvent(500, () => {
			if (this.currentMusic) this.currentMusic.stop();
			this.scene.start("EvaluationScene", { rating });
		});
	}
}