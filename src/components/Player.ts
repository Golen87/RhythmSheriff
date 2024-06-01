import BaseScene from "@/scenes/BaseScene";
import Sound from "./Sound";

export default class Player extends Phaser.GameObjects.Container {
	private size: number;
	public holsterTime: number;
	private shadow: Phaser.GameObjects.Image;
	private sprite: Phaser.GameObjects.Sprite;

	private unequipSound: Sound;
	public allowBounce: boolean;

	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, 0, 0);
		this.scene = scene;
		scene.add.existing(this);

		this.size = 0.57;
		this.holsterTime = -1;

		this.shadow = scene.add.image(x - 10, y - 20, "dog_shadow");
		this.shadow.setAlpha(0.4);
		this.add(this.shadow);

		this.sprite = scene.add.sprite(x, y, "dog", 0);
		this.sprite.setOrigin(0.5, 1.0);
		this.sprite.setScale(this.size);
		this.add(this.sprite);

		this.unequipSound = new Sound(scene, "karate_kick_swing", {
			volume: 0.4,
		});

		this.allowBounce = true;

		this.setupAnimations();
	}

	update(time: number, delta: number) {
		this.sprite.scaleY += (this.size - this.sprite.scaleY) * 0.09;
	}

	onBar(bar: number) {
		if (this.allowBounce) {
			this.sprite.scaleY *= 0.95;
		}
	}

	onBeat(time: number) {
		// Holstering animation
		if (this.holsterTime == time) {
			this.holsterTime = -1;
			this.play("unequip");
		}
	}

	reset() {
		this.sprite.play("unequip");
		this.sprite.setFrame(0);
	}

	play(key: string, playSound = true) {
		if (key == "unequip") {
			if (this.key != "unequip") {
				if (playSound) this.unequipSound.play();
			} else {
				return;
			}
		}

		this.sprite.play(key);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: "spin",
			frames: [
				{ key: "dog", frame: 7, duration: 50 },
				{ key: "dog", frame: 8, duration: 50 },
				{ key: "dog", frame: 9, duration: 50 },
			],
			repeat: -1,
		});
		this.scene.anims.create({
			key: "unequip",
			frames: [
				{ key: "dog", frame: 1, duration: 120 },
				{ key: "dog", frame: 0, duration: 0 },
			],
		});
		this.scene.anims.create({
			key: "big_shoot",
			frames: [
				{ key: "dog", frame: 2, duration: 50 },
				{ key: "dog", frame: 3, duration: 100 },
				{ key: "dog", frame: 4, duration: 250 },
				{ key: "dog", frame: 5, duration: 0 },
			],
		});
		this.scene.anims.create({
			key: "big_shoot_miss",
			frames: [
				{ key: "dog", frame: 2, duration: 50 },
				{ key: "dog", frame: 3, duration: 100 },
				{ key: "dog", frame: 13, duration: 250 },
				{ key: "dog", frame: 14, duration: 0 },
			],
		});
		this.scene.anims.create({
			key: "small_shoot_miss",
			frames: [
				{ key: "dog", frame: 6, duration: 100 },
				{ key: "dog", frame: 11, duration: 200 },
				{ key: "dog", frame: 12, duration: 0 },
			],
		});
	}

	// Return the gun position in world coordinates.
	getGunPosition() {
		const point = new Phaser.Math.Vector2();
		this.sprite.getBottomLeft(point, true);
		const offset =
			this.key === "small_shoot_miss"
				? new Phaser.Math.Vector2(531, -431)
				: new Phaser.Math.Vector2(586, -561);
		point.add(offset.scale(this.size));
		return point;
	}

	get key(): string {
		return this.sprite.anims.currentAnim?.key || "";
	}
}
