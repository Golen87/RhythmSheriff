export default class Player extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		scene.add.existing(this);

		this.sprite = scene.add.image(0, 0, 'items', 8*8);
		this.sprite.setScale(5);
		this.add(this.sprite);


		this.keyUp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyDown = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}

	update(delta) {
		if (this.keyUp.isDown) {
			this.y -= 2;
		}
		if (this.keyLeft.isDown) {
			this.x -= 2;
		}
		if (this.keyDown.isDown) {
			this.y += 2;
		}
		if (this.keyRight.isDown) {
			this.x += 2;
		}
	}
}