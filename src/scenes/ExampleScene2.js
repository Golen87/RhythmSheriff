class ExampleScene2 extends Phaser.Scene {
	constructor() {
		super({key: 'ExampleScene2'});
	}

	preload() {
	}

	create() {
		this.text = this.add.text(0, 0, "Welcome to Example Scene 2!", { font: "40px Courier" });

		let tween = this.tweens.add({
			targets: this.text,
			x: 200,
			y: 250,
			duration: 2000,
			ease: "Elastic",
			easeParams: [1.5, 0.5],
			delay: 1000,
			onComplete: function(source, target) {
				target[0].x = 0;
				target[0].y = 0;
				target[0].setColor("Red");
			}
		}, this);

		this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
		this.key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
	}

	update(time, delta) {
		if (this.key_1.isDown) {
			this.scene.start("ExampleScene1");
		}
		if (this.key_3.isDown) {
			this.scene.start("ExampleScene3");
		}
	}
}

module.exports = ExampleScene2;