import BaseScene from "@/scenes/BaseScene";
import RoundRectangle from "phaser3-rex-plugins/plugins/gameobjects/shape/roundrectangle/RoundRectangle";
import Sound from "./Sound";

export default class DialogueBox extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private allowInput: boolean;
	private hasTapped: boolean;
	private arrowOuter: Phaser.GameObjects.Triangle;
	private box: RoundRectangle;
	private arrowInner: Phaser.GameObjects.Triangle;
	private text: Phaser.GameObjects.Text;
	private nextIcon: Phaser.GameObjects.Text;
	private TapDown: Sound;
	private TapUp: Sound;

	constructor(scene: BaseScene, x: number, y: number, w: number, h: number) {
		super(scene, x, y);
		this.scene = scene;
		scene.add.existing(this);

		this.allowInput = false;
		this.hasTapped = false;

		const BLACK = 0x000000;
		const WHITE = 0xffffff;

		const ARROW_X = -40;

		this.arrowOuter = scene.add.triangle(ARROW_X, 100, 0, 0, 30, 60, 60, 0);
		this.arrowOuter.setOrigin(0.5, 0.0);
		this.arrowOuter.setStrokeStyle(5, BLACK, 1.0);
		this.add(this.arrowOuter);

		this.box = scene.add.rexRoundRectangle(0, 0, w, h, 40, WHITE);
		this.box.setOrigin(0.5, 0.5);
		this.box.setStrokeStyle(5, BLACK, 1.0);
		this.add(this.box);

		const wo = 4;
		const ho = 8;
		this.arrowInner = scene.add.triangle(
			ARROW_X - wo,
			100 + ho / 4 + 1,
			0 + wo,
			0,
			30,
			60 - ho,
			60 - wo,
			0,
			WHITE
		);
		this.arrowInner.setOrigin(0.5, 0.0);
		this.add(this.arrowInner);

		this.text = scene.addText({
			x: 0,
			y: 0,
			text: "",
			size: 35,
			weight: 700,
			color: "black",
		});
		this.text.setWordWrapWidth(w - 50);
		this.text.setOrigin(0.5, 0.5);
		this.add(this.text);

		this.nextIcon = scene.addText({
			x: w / 2 - 20,
			y: h / 2 - 20,
			text: "[tap]",
			size: 25,
			color: "black",
		});
		this.nextIcon.setWordWrapWidth(w - 50);
		this.nextIcon.setOrigin(1.0, 1.0);
		this.add(this.nextIcon);

		this.TapDown = new Sound(scene, "TapDown", {
			volume: 0.5,
		});
		this.TapUp = new Sound(scene, "TapUp", {
			volume: 0.5,
		});
	}

	show(text?: string) {
		this.setAlpha(1);
		this.disableInput();
		this.text.setText(text || "");

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
			this.TapDown.play();
			this.hasTapped = true;
		}
	}

	tapUp() {
		if (this.allowInput && this.hasTapped) {
			this.TapUp.play();
			this.hide();
			return true;
		}
		return false;
	}
}
