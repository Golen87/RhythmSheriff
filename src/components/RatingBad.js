export default class RatingBad extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		scene.add.existing(this);

		this.setScale(1.5);

		let pos = [
			{x:-93,	y:8,	dir:-1,	offset:0},
			{x:-52,	y:-33,	dir:1,	offset:1},
			{x:-9,	y:22,	dir:1,	offset:0},
			{x:41,	y:-29,	dir:-1,	offset:0},
			{x:95,	y:6,	dir:1,	offset:-1.5},
		];

		this.spiral = [];
		for (var i = pos.length - 1; i >= 0; i--) {
			this.spiral[i] = scene.add.image(pos[i].x, pos[i].y, 'try_again_spiral');
			this.spiral[i].dir = pos[i].dir;
			this.spiral[i].offset = pos[i].offset;
			this.add(this.spiral[i]);
		}

		this.icon = scene.add.image(0, 0, 'try_again', 0);
		this.add(this.icon);
	}

	update(time, delta) {
		this.icon.setFrame(Math.floor(20*time/1000)%2);

		for (var i = this.spiral.length - 1; i >= 0; i--) {
			this.spiral[i].rotation = this.spiral[i].offset + this.spiral[i].dir * 3*time/1000;
		}
	}

	show(time) {
		this.setAlpha(1);
	}
}