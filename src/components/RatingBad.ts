import BaseScene from "@/scenes/BaseScene";

export default class RatingBad extends Phaser.GameObjects.Container {
	private spirals: {
		image: Phaser.GameObjects.Image;
		dir: number;
		offset: number;
	}[];
	private icon: Phaser.GameObjects.Image;

	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y);
		scene.add.existing(this);

		this.setScale(1.5);

		let pos = [
			{ x: -93, y: 8, dir: -1, offset: 0 },
			{ x: -52, y: -33, dir: 1, offset: 1 },
			{ x: -9, y: 22, dir: 1, offset: 0 },
			{ x: 41, y: -29, dir: -1, offset: 0 },
			{ x: 95, y: 6, dir: 1, offset: -1.5 },
		];

		this.spirals = [];
		for (var i = pos.length - 1; i >= 0; i--) {
			let image = scene.add.image(pos[i].x, pos[i].y, "try_again_spiral");
			this.add(image);

			this.spirals[i] = {
				image,
				dir: pos[i].dir,
				offset: pos[i].offset,
			};
		}

		this.icon = scene.add.image(0, 0, "try_again", 0);
		this.add(this.icon);
	}

	update(time: number, delta: number) {
		this.icon.setFrame(Math.floor((20 * time) / 1000) % 2);

		for (var i = this.spirals.length - 1; i >= 0; i--) {
			let { image, dir, offset } = this.spirals[i];
			image.rotation = offset + (dir * 3 * time) / 1000;
		}
	}

	show(time: number) {
		this.setAlpha(1);
	}
}
