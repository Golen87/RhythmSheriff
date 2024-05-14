export default class Player extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, 0, 0);
		this.scene = scene;
		scene.add.existing(this);

		this.size = 0.6;
		this.holsterTime = -1;

		this.shadow = scene.add.image(x-10, y-20, 'shadow');
		this.shadow.setAlpha(0.4);
		this.add(this.shadow);

		this.sprite = scene.add.sprite(x, y, 'dog', 0);
		this.sprite.setOrigin(0.5, 1.0);
		this.sprite.setScale(this.size);
		this.sprite.setTint(0x7777ff);
		this.add(this.sprite);

		this.setupAnimations();
	}

	update(time, delta) {
		this.sprite.scaleY += (this.size - this.sprite.scaleY) * 0.1;
	}

	onBar(bar) {
		this.sprite.scaleY *= 0.95;
	}

	onBeat(time) {
		// Holstering animation
		if (this.holsterTime == time) {
			this.holsterTime = -1;
			this.play('unequip');
			this.scene.karate_kick_swing.play();
		}
	}


	play(key) {
		this.sprite.play(key);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: 'spin',
			frames: [
				{key: 'dog', frame: 7, duration: 20},
				{key: 'dog', frame: 8, duration: 20},
				{key: 'dog', frame: 9, duration: 20},
			],
			repeat: -1
		});
		this.scene.anims.create({
			key: 'unequip',
			frames: [
				{key: 'dog', frame: 1, duration: 50},
				{key: 'dog', frame: 0, duration: 0},
			]
		});
		this.scene.anims.create({
			key: 'big_shoot',
			frames: [
				// {key: 'dog', frame: 1, duration: 10},
				{key: 'dog', frame: 2, duration: 20},
				{key: 'dog', frame: 3, duration: 40*2},
				{key: 'dog', frame: 4, duration: 150},
				{key: 'dog', frame: 5, duration: 0},
			]
		});
		this.scene.anims.create({
			key: 'big_shoot_miss',
			frames: [
				{key: 'dog', frame: 3, duration: 50},
				{key: 'dog', frame: 13, duration: 150},
				{key: 'dog', frame: 14, duration: 0},
			]
		});
		this.scene.anims.create({
			key: 'small_shoot',
			frames: [
				{key: 'dog', frame: 7, duration: 50},
				{key: 'dog', frame: 8, duration: 150},
				{key: 'dog', frame: 9, duration: 0},
			]
		});
		this.scene.anims.create({
			key: 'small_shoot_miss',
			frames: [
				// {key: 'dog', frame: 7, duration: 20},
				{key: 'dog', frame: 6, duration: 50},
				{key: 'dog', frame: 11, duration: 150},
				{key: 'dog', frame: 12, duration: 0},
			]
		});
	}
}