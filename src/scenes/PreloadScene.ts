import BaseScene from "./BaseScene";
import { images, spritesheets, audios } from "@/assets/assets";
import { GrayScalePostFilter } from "@/pipelines/GrayScalePostFilter";
import { BlurPostFilter } from "@/pipelines/BlurPostFilter";
import BendWaves from "@/pipelines/BendWavesPostFX";
import BendWaves2 from "@/pipelines/BendWavesPostFX2";

export default class PreloadScene extends BaseScene {
	constructor() {
		super({ key: "PreloadScene" });
	}

	init() {
		// Load pipelines
		let renderer = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
		if (renderer.pipelines) {
			renderer.pipelines.addPostPipeline(
				"GrayScalePostFilter",
				GrayScalePostFilter
			);
			renderer.pipelines.addPostPipeline("BlurPostFilter", BlurPostFilter);
			renderer.pipelines.addPostPipeline("BendWaves", BendWaves);
			renderer.pipelines.addPostPipeline("BendWaves2", BendWaves2);
		}
	}

	preload() {
		this.cameras.main.setBackgroundColor(0x000000);

		// Loading bar
		let width = 0.5 * this.W;
		let x = this.CX - width / 2;
		let y = this.CY;
		let bg = this.add.rectangle(x, y, width, 4, 0x666666).setOrigin(0, 0.5);
		let bar = this.add.rectangle(x, y, 1, 8, 0xdddddd).setOrigin(0, 0.5);

		// Loading text
		this.addText({
			x,
			y,
			size: 16,
			weight: 700,
			color: "#DDDDDD",
			text: "Loading...",
		}).setOrigin(0, 1.5);

		// Listener
		this.load.on("progress", (progress: number) => {
			bar.width = progress * width;
		});

		// Load assets
		for (let image of images) {
			if (image.path) this.load.image(image.key, image.path);
			else console.error(`Image path not found: "${image.key}"`);
		}

		for (let image of spritesheets) {
			if (image.path)
				this.load.spritesheet(image.key, image.path, {
					frameWidth: image.width,
					frameHeight: image.height,
				});
			else console.error(`Spritesheet path not found: "${image.key}"`);
		}

		for (let audio of audios) {
			if (audio.path) this.load.audio(audio.key, audio.path);
			else console.error(`Audio path not found: "${audio.key}"`);
		}
	}

	create() {
		this.fade(true, 100, 0x111111);
		this.addEvent(100, () => {
			this.scene.start("TitleScene");
		});
	}
}
