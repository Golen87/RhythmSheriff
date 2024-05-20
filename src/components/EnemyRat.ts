import BaseScene from "@/scenes/BaseScene";
import Enemy from "./Enemy";

export default class EnemyRat extends Enemy {
	constructor(scene: BaseScene, x: number, y: number) {
		super(scene, x, y, "rat");

		this.size = 0.41;
		this.setScale(this.size);

		this.update(0, 0);
	}

	update(time: number, delta: number) {
		super.update(time, delta);

		let myTime = time - this.appearedOn;

		if (!this.isHiding) {
			let t1 = this.getInterval(myTime, 0.0, 1.0);
			let t2 = this.getInterval(myTime, 1.0, 1.5 - 0.05);
			let t3 = this.getInterval(myTime, 2.0, 2.5);
			let e1 = Phaser.Math.Easing.Cubic.Out(t1);
			let e2 = Phaser.Math.Easing.Cubic.In(t2);
			let e3 = Phaser.Math.Easing.Cubic.In(t3);
			this.hideFac = 1 - 0.8 * e1 - 0.2 * e2 + 1.0 * e3;
			let t4 = this.getInterval(myTime, 0.25, 1.25);
			let e4 = Phaser.Math.Easing.Sine.InOut(t4);
			let t5 = this.getInterval(myTime, 0.75, 1.5 - 0.05);
			let e5 = Phaser.Math.Easing.Sine.In(t5);
			this.turnFac = 0 * e4 + e5;
		} else {
			this.hideFac = 1;
			this.turnFac = 0;
		}

		let turnValue = this.turnFac - this.spinFac;

		let t = 1 - this.getInterval(myTime, 0.0, 1.5);
		let e = Phaser.Math.Easing.Cubic.Out(t);
		this.x =
			this.startX +
			e * (this.invert ? 1 : -1) * 30 * Math.sin(myTime * (2 * Math.PI));
		this.y = this.startY + this.hideDist * this.hideFac;

		this.scaleX = this.size * Math.cos(turnValue * Math.PI);
		this.scaleY += (this.size - this.scaleY) * 0.1;

		this.sprite.setFrame(
			(this.scaleX < 0 ? 1 : 0) + (this.isDestroyed ? 0 : 0)
		);
	}

	appear(time: number, invert: boolean, maxBar: number) {
		this.hidingTime = (time + 2.5) % maxBar;
		this.turningTime = (time + 0.5) % maxBar;

		if (this.isHiding) {
			const stayDuration = 1.5;
			this.prepareToAppear(time, stayDuration, invert);
			this.emit("playRatCue");
		}
	}

	hide() {
		super.hide();
		this.emit("score", this.score, true);
	}

	canHit(time: number) {
		let myTime = time - this.appearedOn;

		if (this.isHiding) {
			return false;
		}
		if (myTime > 0.25 && myTime < 2.3) {
			return true;
		}
		return false;
	}
}
