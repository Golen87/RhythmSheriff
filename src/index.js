import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene.js";
import TitleScene from "./scenes/TitleScene.js";
import LevelScene from "./scenes/LevelScene.js";
import EvaluationScene from "./scenes/EvaluationScene.js";
import EpilogueScene from "./scenes/EpilogueScene.js";
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js';

const config = {
	type: Phaser.AUTO,
	title: "Rhythm Sheriff",
	parent: "RhythmSheriff",
	width: 1000,
	height: 600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: "game",
		width: 1000,
		height: 600
	},
	physics: {
		default: "matter",
		matter: {
			gravity: {
				y: 1
			},
			debug: true
		}
	},
	scene: [
		PreloadScene,
		TitleScene,
		LevelScene,
		EvaluationScene,
		EpilogueScene,
	],
	plugins: {
		global: [
			{
				key: 'rexRoundRectanglePlugin',
				plugin: RoundRectanglePlugin,
				start: true
			}
		]
	}
};

const game = new Phaser.Game(config);