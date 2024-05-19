import BaseScene from "./BaseScene";
import Player from "@/components/Player";
import Enemy from "@/components/Enemy";
import EnemyCat from "@/components/EnemyCat";
import EnemyRat from "@/components/EnemyRat";
import Music from "@/components/Music";
import Sound from "@/components/Sound";
import DialogueBox from "@/components/DialogueBox";
import songMaps from "@/music/songMaps";

export default class LevelScene extends BaseScene {
	private cues: { [key: number]: string };
	private eventMaxRange: number;
	private practiceCount: number;
	private scores: ("perfect" | "good" | "ok" | "bad" | "miss")[];
	private progress: string | null;
	private lastBarTime: number;
	private canSkip: boolean;
	private blockTap: boolean;
	private invert: boolean;

	private background: Phaser.GameObjects.Image;
	private player: Player;
	private enemies: Enemy[];
	private dummy: EnemyCat;

	private dialogueBox: DialogueBox;
	private dialogueList: string[];
	private skipText: Phaser.GameObjects.Text;

	private woodBack: Phaser.GameObjects.Sprite;
	private woodBlock: Phaser.GameObjects.Image;
	private woodFront: Phaser.GameObjects.Image;

	private sandstormGraphics: Phaser.GameObjects.Graphics;
	private tumbleBg: Phaser.GameObjects.Sprite;
	private tumbleBgStartY: number;
	private tumbleFg: Phaser.GameObjects.Sprite;
	private tumbleFgStartY: number;

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
			volume: 0.35,
		});
		this.shoot_2 = new Sound(this, "shoot_2", {
			volume: 0.35,
		});
		this.shoot_3 = new Sound(this, "shoot_3", {
			volume: 0.3,
		});
		this.miss = new Sound(this, "miss", {
			volume: 0.4,
		});
		this.audienceClap = new Sound(this, "audience_clap", {
			volume: 0.5,
		});
		//this.robot_eject.setVolume(0.5);
		//this.robot_withdraw.setVolume(0.3);

		this.robotEject = new Sound(this, "robot_eject", { volume: 0.4 });
		this.catCue = new Sound(this, "cat_cue", { volume: 1.2 });
		this.ratCue = new Sound(this, "rat_cue", { volume: 1.2 });

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

		this.dummy = new EnemyCat(this, 680, 490);
		this.enemies = [
			new EnemyCat(this, 650, 490),
			new EnemyCat(this, 650, 490),
			new EnemyCat(this, 650, 490),
			new EnemyCat(this, 650, 490),
			new EnemyRat(this, 650, 490),
			new EnemyRat(this, 650, 490),
			new EnemyRat(this, 650, 490),
			new EnemyRat(this, 650, 490),
		];
		this.enemies.forEach((enemy) => {
			enemy.on("score", this.onScore, this);
			enemy.on("playCatCue", () => {
				this.robotEject.play();
				this.catCue.play();
			});
			enemy.on("playRatCue", () => {
				this.robotEject.play();
				this.ratCue.play();
			});
		});

		this.woodBlock = this.add.sprite(650, 490, "wood_block");
		this.woodBlock.setOrigin(0.53, 0.02);
		this.woodBlock.setScale(0.25);
		this.woodBlock.setTint(0xaf825b);
		this.woodBlock.setDepth(100);

		this.woodFront = this.add.sprite(650, 490, "wood_front");
		this.woodFront.setScale(0.25);
		this.woodFront.setTint(0x936b48);
		this.woodFront.setDepth(100);

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
		this.player = new Player(this, 260, 570);
		this.player.setDepth(100);

		this.sandstormGraphics = this.add.graphics();
		this.sandstormGraphics.setDepth(200);
		this.sandstormGraphics.fillGradientStyle(
			0xc56000,
			0xc56000,
			0xffd54f,
			0xffd54f,
			0.8,
			0.8,
			0.5,
			0.5
		);
		this.sandstormGraphics.fillRect(0, 0, this.W, this.H);
		this.sandstormGraphics.setAlpha(0);

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
		if (!this.currentMusic) return;

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
			this.player.holsterTime = this.currentMusic.getBar() + 3;
		} else if (this.cues[spinCheckTime] == "holster") {
			this.player.play("unequip");
		} else if (this.cues[spinCheckTime] == "stop") {
			this.player.play("unequip");
			this.player.allowBounce = false;
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

		this.player.onBeat(time);
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
		this.player.holsterTime =
			Math.round(this.currentMusic.getBarTime() + 1.35) %
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
				this.player.play("unequip");
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
			// Cat target introduction
			if (!this.progress) {
				this.progress = "cat_text";
				this.dialogueList = [
					// "Today we're practicing target shooting.",
					"In a duel, you must match your opponent's speed.",
					"When your opponent draws their weapon...\nstrike back!",
				];
				this.onProgress();
			}
			// Cat target practice
			else if (this.progress == "cat_text") {
				this.progress = "practice_cat";

				this.cues = {
					6: "cat",
					14: "cat",
				};
				this.eventMaxRange = 16;
				this.practiceCount = 3;

				this.playMusic(this.practiceMusic);
			}
			// Rat target introduction
			else if (this.progress == "practice_cat") {
				this.progress = "rat_text";
				this.dialogueList = [
					"Not bad!",
					"Your next target is faster.\nTry to keep up.",
				];
				this.onProgress();
			}
			// Rat target practice
			else if (this.progress == "rat_text") {
				this.progress = "practice_rat";

				this.cues = {
					6: "rat",
					14: "rat",
				};
				this.eventMaxRange = 16;
				this.practiceCount = 3;

				this.playMusic(this.practiceMusic);
			}
			// Combined target introduction
			else if (this.progress == "practice_rat") {
				this.progress = "cat_and_rat_text";
				this.dialogueList = [
					"You've got it!",
					"Fast targets may\nthrow off your groove.\nPay attention.",
				];
				this.onProgress();
			}
			// Combined target practice
			else if (this.progress == "cat_and_rat_text") {
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
			}
			// End of practice
			else if (this.progress == "practice_cat_and_rat") {
				this.progress = "end_text";
				this.dialogueList = [
					"Wow. You're the real deal!",
					"It's time to duel...\nGood luck, Sheriff.",
				];
				this.onProgress();
			}
			// Level start
			else if (this.progress == "end_text") {
				this.progress = "level";
				this.cues = songMaps.tapatio;
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
