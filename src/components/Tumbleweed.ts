import BaseScene from "@/scenes/BaseScene";

export default class Tumbleweed extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private followMusic: boolean;
	private musicBpm: number;
	private startTime: number;
	private barTime: number;
	private startX: number;

	private horizontalSpeed: number;
	private spinSpeed: number;
	private bounceY: number;
	private bounceHeight: number;
	private bounceOffset: number;

	private shadow: Phaser.GameObjects.Image;
	private tumbleweed: Phaser.GameObjects.Image;

	constructor(
		scene: BaseScene,
		x: number,
		y: number,
		barTime: number,
		layer: number,
		random: boolean,
		boost: number,
		musicBpm: number
	) {
		super(scene, x, y);
		scene.add.existing(this);
		this.scene = scene;
		this.musicBpm = musicBpm;
		this.startTime = barTime;
		this.startX = x;
		this.followMusic = true;

		const yOffset = layer == 0 ? 34 : layer == 1 ? -25 : layer == 2 ? -47 : -65;
		this.y = y + yOffset;

		const scale =
			layer == 0 ? 0.85 : layer == 1 ? 0.6 : layer == 2 ? 0.37 : 0.28;
		this.setScale(scale);

		this.setDepth(layer == 0 ? 120 : 30 + yOffset / 10);

		this.horizontalSpeed = 420 * scale + 150 * boost;
		this.spinSpeed = 320 + 90 * boost;
		this.bounceY = -0.35 * 200;
		this.bounceHeight = 60 + 10 * scale; // foreground ? 65 : 50;
		this.bounceOffset = 0;

		if (random) {
			const speedBoost = (80 + 170 * boost) * Math.random();
			this.horizontalSpeed += speedBoost;
			this.spinSpeed += 0.9 * speedBoost;
			this.bounceHeight += (30 + 60 * boost) * Math.random();
			this.bounceOffset = 4 * Math.random();
		}

		this.shadow = scene.add.image(0, 0, "shadow");
		// this.shadow.setAlpha(0.5);
		this.shadow.setScale(0.7, 0.3);
		this.add(this.shadow);

		this.tumbleweed = scene.add.image(0, 0, "tumble");
		this.add(this.tumbleweed);

		// let funnytext = scene.addText({
		// 	y: -80,
		// 	text: barTime.toString(),
		// 	size: 30,
		// 	weight: 900,
		// 	color: "white",
		// });
		// funnytext.setOrigin(0.5);
		// this.add(funnytext);
	}

	update(time: number, delta: number) {
		const speed = 105 / 60;

		if (!this.followMusic) {
			this.barTime += (delta / 1000) * (this.musicBpm / 60);
		}

		const bounceFactor = Math.abs(
			Math.sin((this.barTime + this.bounceOffset) * (Math.PI / 2))
		);
		this.shadow.setAlpha(0.35 - 0.25 * bounceFactor);

		this.tumbleweed.angle = (this.spinSpeed * this.barTime) / speed;
		this.x = this.startX + (this.horizontalSpeed * this.barTime) / speed;
		this.tumbleweed.y = this.bounceY - this.bounceHeight * bounceFactor;

		if (this.x > this.scene.W + 100) {
			this.emit("offscreen");
		}
		if (!this.followMusic && this.x < -100) {
			this.emit("offscreen");
		}
	}

	detach() {
		this.followMusic = false;
	}

	slowDown() {
		this.detach();

		const note = (60 / this.musicBpm) * 1000;
		this.scene.tweens.add({
			targets: this,
			bounceHeight: { from: this.bounceHeight, to: 0, duration: 6 * note },
			musicBpm: { from: this.musicBpm, to: 0, duration: 8 * note },
			ease: "Cubic.easeIn",
		});
	}

	setBarTime(barTime: number) {
		if (this.followMusic) {
			this.barTime = barTime - this.startTime;
		}
	}
}
