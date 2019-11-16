export default class DialogueBox extends Phaser.GameObjects.Container {
	constructor(scene, x, y, w, h) {
		super(scene, x, y);
		scene.add.existing(this);

		this.allowInput = false;
		this.hasTapped = false;

		const BLACK = 0x000000;
		const WHITE = 0xffffff;

		this.arrowOuter = scene.add.triangle(0,100, 0,0, 30,60, 60,0);
		this.arrowOuter.setOrigin(0.5, 0.0);
		this.arrowOuter.setStrokeStyle(5, BLACK, 1.0);
		this.add(this.arrowOuter);

		this.box = scene.add.rexRoundRectangle(0, 0, w, h, 40, WHITE);
		this.box.setOrigin(0.5, 0.5);
		this.box.setStrokeStyle(5, BLACK, 1.0);
		this.add(this.box);

		const wo = 4;
		const ho = 8;
		this.arrowInner = scene.add.triangle(0-wo,100+ho/4+1, 0+wo,0, 30,60-ho, 60-wo,0, WHITE);
		this.arrowInner.setOrigin(0.5, 0.0);
		this.add(this.arrowInner);

		this.text = scene.add.text(0, 0, "", { font: "bold 35px Wii", color: "black" });
		this.text.setWordWrapWidth(w-50)
		this.text.setOrigin(0.5, 0.5);
		this.add(this.text);

		this.nextIcon = scene.add.text(w/2-20, h/2-20, "[tap]", { font: "25px Wii", color: "black" });
		this.nextIcon.setWordWrapWidth(w-50)
		this.nextIcon.setOrigin(1.0, 1.0);
		this.add(this.nextIcon);
	}

	show(text) {
		this.setAlpha(1);
		this.disableInput();
		this.text.setText(text);

		this.scene.addEvent(150, this.enableInput, this);
	}

	hide() {
		this.setAlpha(0);
		this.disableInput();
	}

	enableInput() {
		this.allowInput = true;
		this.nextIcon.setAlpha(1);
	}

	disableInput() {
		this.allowInput = false;
		this.nextIcon.setAlpha(0);
		this.hasTapped = false;
	}

	tapDown() {
		if (this.allowInput) {
			this.scene.TapDown.play();
			this.hasTapped = true;
		}
	}

	tapUp() {
		if (this.allowInput && this.hasTapped) {
			this.scene.TapUp.play();
			this.hide();
			return true;
		}
		return false;
	}
}