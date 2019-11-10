export default class Enemy extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		scene.add.existing(this);

		this.startX = x;
		this.startY = y;

		this.size = 0.4;
		this.setScale(this.size);

		this.sprite = scene.add.sprite(0, 0, 'cat');
		this.sprite.setOrigin(0.5, 1.0);
		this.sprite.setTint(0xff7777);
		this.add(this.sprite);
	}

	hit(scene, rating) {
		const points = {
			"perfect": [[-0.166,-0.697],[-0.067,-0.754],[-0.064,-0.690],[-0.059,-0.637],[-0.056,-0.599],[-0.048,-0.551],[-0.040,-0.496],[-0.035,-0.453],[0.043,-0.697]],
			"good": [[-0.211,-0.737],[-0.171,-0.766],[-0.166,-0.646],[-0.142,-0.620],[-0.142,-0.339],[-0.104,-0.467],[-0.104,-0.420],[-0.099,-0.571],[-0.099,-0.522],[-0.032,-0.381],[0.005,-0.619],[0.008,-0.569],[0.016,-0.524],[0.029,-0.766],[0.029,-0.467],[0.037,-0.422],[0.043,-0.646],[0.056,-0.334],[0.099,-0.737]],
			"ok": [[-0.310,-0.816],[-0.310,-0.734],[-0.286,-0.392],[-0.238,-0.544],[-0.222,-0.420],[-0.214,-0.589],[-0.107,-0.839],[-0.053,-0.224],[-0.053,-0.190],[-0.008,-0.843],[0.184,-0.620],[0.201,-0.726],[0.219,-0.420],[0.246,-0.310],[0.281,-0.454]],
			"bad": [[-0.393,-0.644],[-0.390,-0.274],[-0.388,-0.726],[-0.385,-0.449],[-0.350,-0.177],[-0.283,-0.916],[-0.094,-0.131],[-0.070,-0.869],[-0.013,-0.131],[0.070,-0.938],[0.174,-0.861],[0.198,-0.170],[0.217,-0.765],[0.259,-0.657],[0.305,-0.568],[0.316,-0.325],[0.404,-0.400]],
		};
		console.log(rating);
		let point = points[rating][Phaser.Math.Between(0, points[rating].length-1)];

		let w = this.sprite.width;
		let h = this.sprite.height;
		let x = point[0] * w;//Phaser.Math.FloatBetween(-w/2, w/2);
		let y = point[1] * h;//Phaser.Math.FloatBetween(0, -h);
		let frame = Phaser.Math.Between(0, 2);
		let hole = scene.add.image(x, y, 'bullet_hole', frame);
		hole.setRotation(Phaser.Math.Between(0, 2*Math.PI));
		this.add(hole);
	}

	update(time) {
		this.x = this.startX + 20 * Math.sin(0.5*time * (2*Math.PI));
	}
}