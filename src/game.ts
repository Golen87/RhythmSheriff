import Phaser from "phaser";
import PreloadScene from "@/scenes/PreloadScene";
import TitleScene from "@/scenes/TitleScene";
import LevelScene from "@/scenes/LevelScene";
import EvaluationScene from "@/scenes/EvaluationScene";
import EpilogueScene from "@/scenes/EpilogueScene";
import OutlinePipelinePlugin from "phaser3-rex-plugins/plugins/outlinepipeline-plugin.js";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL,
	width: 1000,
	height: 600,
	// mipmapFilter: "LINEAR_MIPMAP_LINEAR",
	roundPixels: false,
	scale: {
		mode: Phaser.Scale.FIT,
	},
	scene: [PreloadScene, TitleScene, LevelScene, EvaluationScene, EpilogueScene],

	plugins: {
		global: [
			{
				key: "rexOutlinePipeline",
				plugin: OutlinePipelinePlugin,
				start: true,
			},
			{
				key: "rexRoundRectanglePlugin",
				plugin: RoundRectanglePlugin,
				start: true,
			},
		],
	},
};

const game = new Phaser.Game(config);
