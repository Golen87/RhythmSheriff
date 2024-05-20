import BaseScene from "@/scenes/BaseScene";
import Sound from "./Sound";

export default class Enemy extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	public startX: number;
	public startY: number;

	public isHit: boolean;
	protected isDestroyed: boolean;
	protected bulletHoles: Phaser.GameObjects.Image[];
	protected hitList: string[];

	protected appearedOn: number;
	public targetTime: number;
	protected score: "perfect" | "good" | "ok" | "bad" | "miss";

	public isHiding: boolean;
	protected hideFac: number;
	public hideDist: number;
	protected hidingTime: number;

	protected isTurned: boolean;
	protected turnFac: number;
	protected spinFac: number;
	protected spinFacTween: Phaser.Tweens.Tween;
	protected turningTime: number;
	protected invert: boolean;

	protected size: number;

	protected sprite: Phaser.GameObjects.Sprite;

	protected target_destroyed_1: Sound;
	protected destroy_pieces: Sound;

	constructor(scene: BaseScene, x: number, y: number, type: string) {
		super(scene, x, y);
		scene.add.existing(this);
		this.scene = scene;
		this.type = type;

		this.startX = x;
		this.startY = y;

		this.isHit = false;
		this.isDestroyed = false;
		this.bulletHoles = [];
		this.hitList = [];

		this.appearedOn = 0;
		this.targetTime = 0;

		this.isHiding = true;
		this.hideFac = 1;
		this.hideDist = 215 + 30;
		this.hidingTime = -1;

		this.isTurned = false;
		this.turnFac = 0;
		this.spinFac = 0;
		this.spinFacTween = scene.tweens.add({ targets: this });
		this.turningTime = -1;
		this.invert = false;

		this.size = 0.45;

		this.sprite = scene.add.sprite(0, 0, "cat", 0);
		this.sprite.setOrigin(0.5, 1.0);
		this.add(this.sprite);

		this.target_destroyed_1 = new Sound(scene, "target_destroyed_1", {
			volume: 0.5,
		});
		this.destroy_pieces = new Sound(scene, "destroy_pieces", {
			volume: 0.5,
		});
	}

	update(time: number, delta: number) {}

	onBar(bar: number) {
		this.scaleY *= 0.95;
		if (!this.isHiding) {
		}
	}

	onBeat(time: number) {
		let myTime = time - this.appearedOn;
		let index = Math.round(myTime * 4) / 4;

		if (time >= this.turningTime && !this.isHiding && !this.isTurned) {
			this.turningTime = -1;
			this.isTurned = true;
			//this.scene.flip.play();
		}

		if (time >= this.hidingTime && !this.isHiding) {
			this.hide();
			//this.scene.robot_withdraw.play();
		}
	}

	prepareToAppear(time: number, stayDuration: number, invert: boolean) {
		this.appearedOn = time;
		this.targetTime = time + stayDuration;
		this.isHiding = false;
		this.isTurned = false;
		this.turnFac = 0;
		this.isHit = false;
		this.isDestroyed = false;
		this.invert = invert;
		this.score = "miss";

		// Clear bullet holes
		this.hitList = [];
		for (var i = this.bulletHoles.length - 1; i >= 0; i--) {
			let hole = this.bulletHoles[i];
			this.remove(hole);
			hole.destroy();
		}
	}

	appear(time: number, invert: boolean, maxBar: number) {}

	hide() {
		this.hidingTime = -1;
		this.isHiding = true;
	}

	getHitPoint(rating: "perfect" | "good" | "ok" | "bad"): number[] {
		const points = {
			perfect: [[-0.017, -0.604]],
			good: [
				[-0.117, -0.671],
				[-0.117, -0.536],
				[0.107, -0.673],
				[0.12, -0.535],
			],
			ok: [
				[-0.253, -0.798],
				[-0.247, -0.405],
				[-0.197, -0.527],
				[-0.153, -0.34],
				[0.15, -0.462],
				[0.153, -0.353],
				[0.163, -0.547],
				[0.227, -0.791],
			],
			bad: [
				[-0.4, -0.309],
				[-0.39, -0.449],
				[-0.39, -0.227],
				[-0.373, -0.722],
				[-0.373, -0.524],
				[-0.34, -0.604],
				[0.297, -0.475],
				[0.35, -0.629],
				[0.357, -0.538],
				[0.37, -0.249],
				[0.377, -0.724],
				[0.38, -0.416],
				[0.407, -0.318],
			],
		};

		let yLimit = -0.2 - this.hideFac;
		let recommendedPoints = points[rating].filter(
			(point) => !this.hitList.includes(point.toString()) && point[1] < yLimit
		);
		let point = Phaser.Math.RND.pick(recommendedPoints);
		if (!point) point = Phaser.Math.RND.pick(points[rating]);

		this.hitList.push(point.toString());
		return point;
	}

	canHit(time: number) {
		return false;
	}

	hit(rating: "perfect" | "good" | "ok" | "bad") {
		let point = this.getHitPoint(rating);
		this.addBulletHole(point[0], point[1]);

		this.isHit = true;
		this.score = rating;

		switch (rating) {
			case "perfect":
				this.kill(true);
				break;

			case "good":
				this.kill(false);
				this.applySmallSpin();
				break;

			case "ok":
				this.applyMediumSpin();
				break;

			case "bad":
				this.applyLargeSpin();
				break;
		}
	}

	addBulletHole(x: number, y: number) {
		x *= this.sprite.width;
		y *= this.sprite.height;
		const frame = Phaser.Math.Between(0, 2);

		const hole = this.scene.add.image(x, y, "bullet_hole", frame);
		hole.setAngle(360 * Math.random());
		this.add(hole);
		this.bulletHoles.push(hole);

		// Broadcast bullet hole position
		let coord = new Phaser.Math.Vector2();
		hole.getCenter(coord, true);
		this.emit("bulletHole", coord);
	}

	isThreat() {
		return this.isTurned && this.turnFac > 0.9;
	}

	kill(goodKill: boolean) {
		if (goodKill) this.target_destroyed_1.play();
		else this.destroy_pieces.play();

		this.isDestroyed = true;
	}

	applySmallSpin() {
		this.spinFacTween.stop();
		this.spinFacTween = this.scene.tweens.addCounter({
			duration: 500,
			ease: (x: number) => {
				// https://www.desmos.com/calculator/7ybratjzqe
				let a = 1 - Math.pow(1 - x, 3);
				let b = 1 + 2 * Math.pow(x - 1, 3) + Math.pow(x - 1, 2);
				let y = 5 * a * (1 - b);
				this.spinFac = 0.3 * y;
			},
			onComplete: () => {
				this.spinFac = 0;
			},
		});
	}

	applyMediumSpin() {
		this.spinFacTween.stop();
		this.spinFacTween = this.scene.tweens.add({
			targets: this,
			spinFac: { from: 2, to: 0 },
			duration: 800,
			ease: "Back.Out",
		});
	}

	applyLargeSpin() {
		this.spinFacTween.stop();
		this.spinFacTween = this.scene.tweens.add({
			targets: this,
			spinFac: { from: 2, to: 0 },
			duration: 1200,
			ease: "Back.Out",
		});
	}

	getInterval(x: number, min: number, max: number) {
		if (x <= min) return 0;
		if (x >= max) return 1;
		return (x - min) / (max - min);
	}
}
