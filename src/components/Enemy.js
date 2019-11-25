export default class Enemy extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		scene.add.existing(this);
		this.scene = scene;

		this.startX = x;
		this.startY = y;

		this.isHit = false;
		this.isDestroyed = false;
		this.bullet_holes = [];
		this.hit_list = [];

		this.appearedOn = null;
		this.targetTime = null;

		this.isHiding = true;
		this.hideFac = 1;
		this.hideDist = 215;
		this.hidingTime = -1;

		this.isTurned = false;
		this.turnFac = 0;
		this.spinFac = 0;
		this.turningTime = -1;
		this.invert = false;

		this.size = 0.4;
		this.setScale(this.size);

		this.sprite = scene.add.sprite(0, 0, 'cat', 0);
		this.sprite.setOrigin(0.5, 1.0);
		this.sprite.setTint(0xff7777);
		this.add(this.sprite);

		this.update(0);
	}

	update(time, delta) {
		let myTime = time - this.appearedOn;

		this.scaleY += (this.size - this.scaleY) * 0.1;

		//this.hideFac += Phaser.Math.Clamp(this.isHiding - this.hideFac, -delta/2, delta/2);
		//this.turnFac += Phaser.Math.Clamp(this.isTurned - this.turnFac, -delta, delta);
		//this.hideFac += (this.isHiding - this.hideFac) * 0.2;
		//this.turnFac += (this.isTurned - this.turnFac) * 0.2;
		this.spinFac += (0 - this.spinFac) * 0.1;
		//let hideValue = Phaser.Math.Easing.Cubic.InOut(this.hideFac);
		//let turnValue = Phaser.Math.Easing.Cubic.InOut(this.turnFac);

		if (!this.isHiding) {
			let t1 = this.getInterval(myTime, 0.0, 1.0);
			let t2 = this.getInterval(myTime, 1.0, 2.0-0.1);
			let t3 = this.getInterval(myTime, 2.5, 3.0);
			let e1 = Phaser.Math.Easing.Cubic.Out(t1);
			let e2 = Phaser.Math.Easing.Cubic.In(t2);
			let e3 = Phaser.Math.Easing.Cubic.In(t3);
			this.hideFac = 1 - 0.6 * e1 - 0.4 * e2 + 1.0 * e3;
			let t4 = this.getInterval(myTime, 0.5, 2.0-0.1);
			let e4 = Phaser.Math.Easing.Circular.In(t4);
			this.turnFac = e4;
		}
		else {
			this.hideFac = 1;
			this.turnFac = 0;
		}

		let hideValue = this.hideFac;
		let turnValue = this.turnFac - this.spinFac;

		let t = 1 - this.getInterval(myTime, 0.0, 2.0);
		let e = Phaser.Math.Easing.Cubic.Out(t);
		this.x = this.startX + e * (this.invert?1:-1) * 30 * Math.cos(0.5*myTime * (2*Math.PI));
		this.y = this.startY + this.hideDist * hideValue;

		this.scaleX = this.size * Math.cos(turnValue * Math.PI);

		this.sprite.setFrame(2*(this.scaleX < 0) + 1*this.isDestroyed);
	}

	onBar(bar) {
		this.scaleY *= 0.95;
		if (!this.isHiding) {
		}
	}

	onBeat(time) {
		let myTime = time - this.appearedOn;
		let index = Math.round(myTime*4)/4;

		//if (this.hideFac == 1) {
		//	this.isHiding = false;
		//}

		// if (!this.isDead()) {
		// 	if (bar % 8 == 6) {
		// 		this.scene.girl_one.play();
		// 		if (!this.isTurned) {
		// 			this.isTurned = true;
		// 			this.scene.flip.play();
		// 			// Fuck no
		// 			//this.scene.player.play('big_equip');
		// 			//this.scene.player.holsterTime = (Math.ceil(this.scene.currentMusic.getBarTime() + 1.25 - 1) % this.scene.currentMusic.maxBar) + 1;
		// 		}
		// 	}
		// 	if (bar % 8 == 0) {
		// 		if (this.isTurned) {
		// 			this.isTurned = false;
		// 			this.scene.flip.play();
		// 		}
		// 	}
		// }

		// if (bar % 8 == 5) {
		// 	this.appear();
		// }

		if (time >= this.turningTime && !this.isHiding && !this.isTurned) {
			this.turningTime = -1;
			this.isTurned = true;
			//this.scene.flip.play();
		}

		if (time >= this.hidingTime && !this.isHiding) {
			this.hide();
			//this.scene.robot_withdraw.play();
		}
	}

	appear(time, invert) {
		this.hidingTime = (time + 3) % this.scene.currentMusic.maxBar;
		this.turningTime = (time + 1) % this.scene.currentMusic.maxBar;

		if (this.isHiding) {
			this.appearedOn = time;
			this.targetTime = time + 2;
			this.isHiding = false;
			this.isTurned = false;
			this.turnFac = 0;
			this.isHit = false;
			this.isDestroyed = false;
			this.invert = invert;
			this.score = 'miss';

			for (var i = this.bullet_holes.length - 1; i >= 0; i--) {
				let hole = this.bullet_holes[i];
				this.remove(hole);
				hole.destroy();
			}

			//this.scene.robot_eject.play();
			this.scene.cat_cue.play();
		}
	}

	hide() {
		this.hidingTime = -1;
		this.isHiding = true;
		this.emit('score', this.score);
	}

	getHitPoint(rating) {
		const points = {
			"perfect": [[-0.117,-0.697],[-0.025,-0.754],[-0.023,-0.690],[-0.018,-0.637],[-0.015,-0.599],[-0.008,-0.551],[0.000,-0.496],[0.005,-0.453],[0.078,-0.697]],
			"good": [[-0.160,-0.737],[-0.122,-0.766],[-0.117,-0.646],[-0.095,-0.620],[-0.095,-0.339],[-0.060,-0.467],[-0.060,-0.420],[-0.055,-0.571],[-0.055,-0.522],[0.007,-0.381],[0.042,-0.619],[0.045,-0.569],[0.052,-0.524],[0.065,-0.766],[0.065,-0.467],[0.073,-0.422],[0.078,-0.646],[0.090,-0.334],[0.130,-0.737]],
			"ok": [[-0.253,-0.816],[-0.253,-0.734],[-0.230,-0.392],[-0.185,-0.544],[-0.170,-0.420],[-0.162,-0.589],[-0.062,-0.839],[-0.013,-0.224],[-0.013,-0.190],[0.030,-0.843],[0.210,-0.620],[0.225,-0.726],[0.243,-0.420],[0.267,-0.310],[0.300,-0.454]],
			"bad": [[-0.330,-0.644],[-0.328,-0.274],[-0.325,-0.726],[-0.323,-0.449],[-0.290,-0.177],[-0.227,-0.916],[-0.050,-0.131],[-0.028,-0.869],[0.025,-0.131],[0.103,-0.938],[0.200,-0.861],[0.223,-0.170],[0.240,-0.765],[0.280,-0.657],[0.323,-0.568],[0.333,-0.325],[0.415,-0.400]],
		};

		if (!points[rating]) {
			return null;
		}

		let point = null;
		for (var i = 0; i < 10; i++) {
			point = points[rating][Phaser.Math.Between(0, points[rating].length-1)];
			if (!this.hit_list.includes(point.toString())) {
				break;
			}
		}

		this.hit_list.push(point.toString());
		return point;
	}

	canHit(time) {
		let myTime = time - this.appearedOn;

		if (this.isHiding) {
			return false;
		}
		if (myTime > 0.5 && myTime < 2.8) {
			return true;
		}
		return false;
	}

	hit(scene, rating) {
		let point = this.getHitPoint(rating);

		if (!point) {
			console.warn(rating);
			return;
		}

		let w = this.sprite.width;
		let h = this.sprite.height;
		let x = point[0] * w;
		let y = point[1] * h;
		let frame = Phaser.Math.Between(0, 2);
		let hole = scene.add.image(x, y, 'bullet_hole', frame);
		hole.setRotation(Phaser.Math.Between(0, 2*Math.PI));
		this.add(hole);
		this.bullet_holes.push(hole);


		this.isHit = true;
		this.score = rating;

		if (rating == "perfect") {
			this.kill(true);
		}
		else if (rating == "good") {
			this.kill(false);
		}
		else if (rating == "ok") {
			this.spinFac = 2;
		}
		else if (rating == "bad") {
			this.spinFac = 2;
		}
	}

	isThreat() {
		return this.isTurned && this.turnFac > 0.9;
	}

	isDead() {
		return this.health <= 0;
	}

	kill(goodKill) {
		if (goodKill)
			this.scene.target_destroyed_1.play();
		else
			this.scene.destroy_pieces.play();

		this.isDestroyed = true;
	}

	getInterval(x, min, max) {
		if (x <= min)
			return 0;
		if (x >= max)
			return 1;
		return (x - min) / (max - min);
	}
}