export default class RatingGreat extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		scene.add.existing(this);

		this.setScale(1.5);


		let starPos = [{x:-114, y:-1}, {x:114, y:-1}];
		let glowOffset = {x:2, y:1};

		this.iconGlow = scene.add.image(glowOffset.x, glowOffset.y, 'superb_glow');
		this.iconGlow.setTint(0xff0000);
		this.add(this.iconGlow);

		this.icon = scene.add.image(0, 0, 'superb');
		this.add(this.icon);


		this.starGlow = [];
		this.starOutline = [];
		this.starColor = [];
		this.starInside = [];
		for (var i = 0; i < 2; i++) {
			let sx = starPos[i].x;
			let sy = starPos[i].y;

			this.starGlow[i] = scene.add.image(sx+glowOffset.x, sy+glowOffset.y, 'superb_star_glow');
			this.starGlow[i].setTint(0xff0000);
			this.add(this.starGlow[i]);

			this.starOutline[i] = scene.add.image(sx, sy, 'superb_star_outline');
			this.add(this.starOutline[i]);

			this.starColor[i] = scene.add.image(sx, sy, 'superb_star_color');
			this.add(this.starColor[i]);

			this.starInside[i] = scene.make.image({x:x+sx*this.scaleX, y:y+sy*this.scaleY, key:'superb_star_inside', add:false});
			this.starInside[i].setScale(this.scaleX);
			this.starColor[i].mask = new Phaser.Display.Masks.BitmapMask(scene, this.starInside[i]);
		}

		this.sendToBack(this.starGlow[0]);
		this.sendToBack(this.starGlow[1]);


		let sparkPos = [
			{x:93,	y:-24,	type:'white',	offset: 0.0},
			{x:57,	y:-18,	type:'white',	offset: 0.3},
			{x:8,	y:-26,	type:'white',	offset: 0.45},
			{x:-41,	y:-21,	type:'white',	offset: 0.25},
			{x:-94,	y:-10,	type:'white',	offset: 0.3},
			{x:116,	y:14,	type:'red',		offset: 0.1},
			{x:57,	y:17,	type:'red',		offset: 0.95},
			{x:0,	y:16,	type:'red',		offset: 0.8},
			{x:-63,	y:17,	type:'red',		offset: 0.35},
		];

		this.sparks = [];
		for (var i = 0; i < sparkPos.length; i++) {
			let sx = sparkPos[i].x;
			let sy = sparkPos[i].y;
			let key = 'superb_' + sparkPos[i].type + '_star';
			let offset = sparkPos[i].offset;

			this.sparks[i] = scene.add.image(sx, sy, key);
			this.sparks[i].offset = offset * 2 * Math.PI;
			this.sparks[i].setScale(0.9);
			this.add(this.sparks[i]);
		}
	}

	update(time, delta) {
		let glowAlpha = 0.4 + 0.4*Math.sin(6*time/1000);

		this.iconGlow.setAlpha(glowAlpha);

		for (var i = 0; i < 2; i++) {
			this.starGlow[i].rotation = -3*time/1000;
			this.starOutline[i].rotation = -3*time/1000;
			this.starInside[i].rotation = -3*time/1000;

			this.starGlow[i].setAlpha(glowAlpha);
		}

		for (var i = 0; i < this.sparks.length; i++) {
			let t = -3*time/1000 + this.sparks[i].offset;
			let scale = Math.max(0.9 * Math.sin(t), 0)**2;
			this.sparks[i].rotation = t;
			this.sparks[i].setScale(scale);
		}
	}

	show(time) {
		this.setAlpha(1);
	}
}