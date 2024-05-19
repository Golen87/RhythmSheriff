import BaseScene from "@/scenes/BaseScene";
import Enemy from "./Enemy";

export default class EnemyCat extends Enemy {
	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y, "cat");

		this.size = 0.45;
		this.setScale(this.size);

		this.update(0, 0);
	}

	update(time: number, delta: number) {
		super.update(time, delta);

		let myTime = time - this.appearedOn;

		if (!this.isHiding) {
			let t1 = this.getInterval(myTime, 0.0, 1.0);
			let t2 = this.getInterval(myTime, 1.0, 2.0 - 0.05);
			let t3 = this.getInterval(myTime, 2.5, 3.0);
			let e1 = Phaser.Math.Easing.Cubic.Out(t1);
			let e2 = Phaser.Math.Easing.Cubic.In(t2);
			let e3 = Phaser.Math.Easing.Cubic.In(t3);
			this.hideFac = 1 - 0.7 * e1 - 0.3 * e2 + 1.0 * e3;
			let t4 = this.getInterval(myTime, 0.5, 2.0 - 0.05);
			let e4 = Phaser.Math.Easing.Circular.In(t4);
			this.turnFac = e4;
		} else {
			this.hideFac = 1;
			this.turnFac = 0;
		}

		let hideValue = this.hideFac;
		let turnValue = this.turnFac - this.spinFac;

		let t = 1 - this.getInterval(myTime, 0.0, 2.0);
		let e = Phaser.Math.Easing.Cubic.Out(t);
		this.x =
			this.startX +
			e * (this.invert ? 1 : -1) * 30 * Math.cos(0.5 * myTime * (2 * Math.PI));
		this.y = this.startY + this.hideDist * hideValue;

		this.scaleX = this.size * Math.cos(turnValue * Math.PI);
		this.scaleY += (this.size - this.scaleY) * 0.1;

		this.sprite.setFrame(
			(this.scaleX < 0 ? 1 : 0) + (this.isDestroyed ? 0 : 0)
		);
	}

	appear(time: number, invert: boolean, maxBar: number) {
		this.hidingTime = (time + 3) % maxBar;
		this.turningTime = (time + 1) % maxBar;

		if (this.isHiding) {
			const stayDuration = 2;
			this.prepareToAppear(time, stayDuration, invert);
			this.emit("playCatCue");
		}
	}

	hide() {
		super.hide();
		this.emit("score", this.score, false);
	}

	canHit(time: number) {
		let myTime = time - this.appearedOn;

		if (this.isHiding) {
			return false;
		}
		if (myTime > 0.5 && myTime < 2.8) {
			return true;
		}
		return false;
	}
}
