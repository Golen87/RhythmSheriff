import BaseScene from "@/scenes/BaseScene";

export default class RatingGood extends Phaser.GameObjects.Container {
	private text: Phaser.GameObjects.Text;
	private puffs: {
		image: Phaser.GameObjects.Image;
		startX: number;
		startY: number;
		fac: number;
		offset: number;
	}[];
	private icon: Phaser.GameObjects.Image;
	private timeOffset: number;

	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y);
		scene.add.existing(this);

		this.setScale(1.5);

		this.text = scene.addText({
			x: -80,
			y: -30,
			text: "...but still just...",
			size: 25,
			weight: 700,
		});
		this.text.setScale(1 / 1.5);
		this.text.setOrigin(1.0, 0.5);
		this.add(this.text);

		const k = 0.3;
		let puffs = [
			{ x: 40, y: -15, angle: -1, fac: 1.0, offset: 0.45 },
			{ x: 40, y: -15, angle: -1, fac: 0.7, offset: 0.7 },
			{ x: 40, y: -15, angle: -1, fac: 0.4, offset: 0.95 },
			{ x: 50, y: -20, angle: -45, fac: 1.0, offset: 0.0 },
			{ x: 50, y: -20, angle: -45, fac: 0.7, offset: 0.25 },
			{ x: 50, y: -20, angle: -45, fac: 0.4, offset: 0.5 },
			{ x: 45, y: -15, angle: -85, fac: 1.0, offset: 0.2 },
			{ x: 45, y: -15, angle: -85, fac: 0.7, offset: 0.45 },
			{ x: 45, y: -15, angle: -85, fac: 0.4, offset: 0.7 },
		];

		this.puffs = [];
		for (var i = 0; i < puffs.length; i++) {
			let image = scene.add.image(0, 0, "ok_puff");
			image.setOrigin(0.0, 0.5);
			image.setAlpha(0);
			image.setAngle(puffs[i].angle);
			this.add(image);

			this.puffs[i] = {
				image,
				startX: puffs[i].x,
				startY: puffs[i].y,
				fac: puffs[i].fac,
				offset: puffs[i].offset,
			};
		}

		this.icon = scene.add.image(0, 0, "ok");
		this.add(this.icon);
	}

	update(time: number, delta: number) {
		if (this.alpha == 0) return;

		let t = (-6.4 * time) / 1000;
		this.icon.setScale(0.99 + 0.01 * Math.sin(t));

		for (var i = this.puffs.length - 1; i >= 0; i--) {
			let t = (time / 1000 - this.timeOffset - this.puffs[i].offset) % 2;
			let fac = this.puffs[i].fac;
			let xs = Phaser.Math.Easing.Back.Out(this.getInterval(t, 0, 0.2) ** 2, 5);
			let ys = Phaser.Math.Easing.Back.Out(this.getInterval(t, 0, 0.125) ** 2);
			let dist =
				45 *
				(1 - 0.6 * (1 - fac)) *
				(0.5 +
					Phaser.Math.Easing.Sine.Out(this.getInterval(t, 0, 0.6 + 0.1 * fac)));
			let alpha = 1 - this.getInterval(t, 0.4, 0.5 + 0.1 * fac);

			let { image, startX, startY } = this.puffs[i];
			image.x = startX + Math.cos(image.rotation) * dist;
			image.y = startY + Math.sin(image.rotation) * dist;
			image.setScale(xs, ys);
			image.setAlpha(alpha);
		}
	}

	show(time: number) {
		this.setAlpha(1);
		this.timeOffset = time / 1000 + 0.5;
	}

	getInterval(x: number, min: number, max: number) {
		if (x <= min) return 0;
		if (x >= max) return 1;
		return (x - min) / (max - min);
	}
}
