import BaseScene from "@/scenes/BaseScene";
import Sound from "./Sound";

export default class Enemy extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	public startX: number;
	public startY: number;

	public isHit: boolean;
	protected isDestroyed: boolean;
	protected bullet_holes: Phaser.GameObjects.Image[];
	protected hit_list: string[];

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
		this.bullet_holes = [];
		this.hit_list = [];

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
		for (var i = this.bullet_holes.length - 1; i >= 0; i--) {
			let hole = this.bullet_holes[i];
			this.remove(hole);
			hole.destroy();
		}
	}

	appear(time: number, invert: boolean, maxBar: number) {}

	hide() {
		this.hidingTime = -1;
		this.isHiding = true;
	}

	getHitPoint(rating: "perfect" | "good" | "ok" | "bad"): number[] | null {
		const points = {
			perfect: [
				[-0.025, -0.754],
				[-0.023, -0.69],
				[-0.018, -0.637],
				[-0.015, -0.599],
				[-0.008, -0.551],
				[0.0, -0.496],
				[0.005, -0.453],
			],
			good: [
				[-0.16, -0.737],
				[-0.122, -0.766],
				[-0.117, -0.646],
				[-0.095, -0.62],
				[-0.095, -0.339],
				[-0.06, -0.467],
				[-0.06, -0.42],
				[-0.055, -0.571],
				[-0.055, -0.522],
				[0.007, -0.381],
				[0.042, -0.619],
				[0.045, -0.569],
				[0.052, -0.524],
				[0.065, -0.766],
				[0.065, -0.467],
				[0.073, -0.422],
				[0.078, -0.646],
				[0.09, -0.334],
				[0.13, -0.737],
			],
			ok: [
				[-0.253, -0.816],
				[-0.253, -0.734],
				[-0.23, -0.392],
				[-0.185, -0.544],
				[-0.17, -0.42],
				[-0.162, -0.589],
				[-0.062, -0.839],
				[-0.013, -0.224],
				[-0.013, -0.19],
				[0.03, -0.843],
				[0.21, -0.62],
				[0.225, -0.726],
				[0.243, -0.42],
				[0.267, -0.31],
				[0.3, -0.454],
			],
			bad: [
				[-0.33, -0.644],
				[-0.328, -0.274],
				[-0.325, -0.726],
				[-0.323, -0.449],
				[-0.29, -0.177],
				[-0.227, -0.916],
				[-0.05, -0.131],
				[-0.028, -0.869],
				[0.025, -0.131],
				[0.103, -0.938],
				[0.2, -0.861],
				[0.223, -0.17],
				[0.24, -0.765],
				[0.28, -0.657],
				[0.323, -0.568],
				[0.333, -0.325],
				[0.415, -0.4],
			],
		};

		if (!points[rating]) {
			return null;
		}

		let point = null;
		for (var i = 0; i < 10; i++) {
			point = points[rating][Phaser.Math.Between(0, points[rating].length - 1)];
			if (!this.hit_list.includes(point.toString())) {
				break;
			}
		}

		if (point) {
			this.hit_list.push(point.toString());
		}
		return point;
	}

	canHit(time: number) {
		return false;
	}

	hit(rating: "perfect" | "good" | "ok" | "bad") {
		let point = this.getHitPoint(rating);

		if (!point) {
			console.warn(rating);
			return;
		}

		let w = this.sprite.width;
		let h = this.sprite.height;
		let x = point[0] * w;
		let y = point[1] * h;
		let frame = Phaser.Math.Between(0, 2);
		let hole = this.scene.add.image(x, y, "bullet_hole", frame);
		hole.setRotation(Phaser.Math.Between(0, 2 * Math.PI));
		this.add(hole);
		this.bullet_holes.push(hole);

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
			case "bad":
				this.applyLargeSpin();
				break;
		}
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

	applyLargeSpin() {
		this.spinFacTween.stop();
		this.spinFacTween = this.scene.tweens.add({
			targets: this,
			spinFac: { from: 2, to: 0 },
			duration: 1000,
			ease: "Back.Out",
		});
	}

	getInterval(x: number, min: number, max: number) {
		if (x <= min) return 0;
		if (x >= max) return 1;
		return (x - min) / (max - min);
	}
}
