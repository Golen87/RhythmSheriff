export default class RatingGood extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		scene.add.existing(this);

		this.setScale(1.5);

		this.text = scene.add.text(-80, -30, "...but still just...", { font: "bold 25px Wii" });
		this.text.setScale(1/1.5);
		this.text.setOrigin(1.0, 0.5);
		this.add(this.text);

		const k = 0.3;
		let puff = [
			{x:40,	y:-15,	angle:-1,	fac:1.0,	offset:0.45},
			{x:40,	y:-15,	angle:-1,	fac:0.7,	offset:0.70},
			{x:40,	y:-15,	angle:-1,	fac:0.4,	offset:0.95},
			{x:50,	y:-20,	angle:-45,	fac:1.0,	offset:0.00},
			{x:50,	y:-20,	angle:-45,	fac:0.7,	offset:0.25},
			{x:50,	y:-20,	angle:-45,	fac:0.4,	offset:0.50},
			{x:45,	y:-15,	angle:-85,	fac:1.0,	offset:0.20},
			{x:45,	y:-15,	angle:-85,	fac:0.7,	offset:0.45},
			{x:45,	y:-15,	angle:-85,	fac:0.4,	offset:0.70},
		];

		this.puffs = [];
		for (var i = 0; i < puff.length; i++) {
			this.puffs[i] = scene.add.image(0, 0, 'ok_puff');
			this.puffs[i].setOrigin(0.0, 0.5);
			this.puffs[i].setAlpha(0);
			this.puffs[i].setAngle(puff[i].angle);
			this.puffs[i].startX = puff[i].x;
			this.puffs[i].startY = puff[i].y;
			this.puffs[i].fac = puff[i].fac;
			this.puffs[i].offset = puff[i].offset;
			this.add(this.puffs[i]);
		}


		this.icon = scene.add.image(0, 0, 'ok');
		this.add(this.icon);
	}

	update(time, delta) {
		if (this.alpha == 0)
			return;

		let t = -6.4*time/1000;
		this.icon.setScale(0.99 + 0.01 * Math.sin(t));

		for (var i = this.puffs.length - 1; i >= 0; i--) {
			let t = ((time/1000 - this.timeOffset - this.puffs[i].offset) % 2);
			let fac = this.puffs[i].fac;
			let xs = Phaser.Math.Easing.Back.Out(this.getInterval(t, 0, 0.2)**2, 5);
			let ys = Phaser.Math.Easing.Back.Out(this.getInterval(t, 0, 0.125)**2);
			let dist = 45*(1-0.6*(1-fac)) * (0.5 + Phaser.Math.Easing.Sine.Out(this.getInterval(t, 0, 0.6+0.1*fac)));
			let alpha = 1 - this.getInterval(t, 0.4, 0.5+0.1*fac);

			this.puffs[i].x = this.puffs[i].startX + Math.cos(this.puffs[i].rotation) * dist;
			this.puffs[i].y = this.puffs[i].startY + Math.sin(this.puffs[i].rotation) * dist;
			this.puffs[i].setScale(xs, ys);
			this.puffs[i].setAlpha(alpha);
		}
	}

	show(time) {
		this.setAlpha(1);
		this.timeOffset = time/1000 + 0.5;
	}

	getInterval(x, min, max) {
		if (x <= min)
			return 0;
		if (x >= max)
			return 1;
		return (x - min) / (max - min);
	}
}