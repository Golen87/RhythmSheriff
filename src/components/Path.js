export default class Path extends Phaser.GameObjects.Container {
	constructor(scene, pointA, pointB) {
		super(scene, 0, 0);
		scene.add.existing(this);

		this.pointA = pointA;
		this.pointB = pointB;

		this.middle = new Phaser.Math.Vector2(
			(pointA.x + pointB.x) / 2,
			(pointA.y + pointB.y) / 2
		);

		this.graphics = scene.add.graphics();
		this.add(this.graphics);
	}

	setPoint(point) {
		this.pointA.set(point.x, point.y);
	}

	update(delta, player) {
		this.pointB.set(player.x, player.y);

		this.draw();
	}

	draw() {
		this.curve = new Phaser.Curves.CubicBezier(
			this.pointA,
			new Phaser.Math.Vector2(
				this.pointA.x,
				(this.pointA.y + this.pointB.y) / 2
			),
			new Phaser.Math.Vector2(
				this.pointB.x,
				(this.pointA.y + this.pointB.y) / 2
			),
			this.pointB
		);


		this.graphics.clear();

		this.graphics.lineStyle(5, 0xffffff);
		this.curve.draw(this.graphics);

		this.graphics.lineStyle(10, 0xffffff);
		this.graphics.strokeCircle(this.pointA.x, this.pointA.y, 5);

		this.graphics.lineStyle(5, 0xffffff);
		this.graphics.strokeCircle(this.pointB.x, this.pointB.y, 10);
	}
}