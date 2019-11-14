import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene.js"
import TitleScene from "./scenes/TitleScene.js"
import LevelScene from "./scenes/LevelScene.js"
import EvaluationScene from "./scenes/EvaluationScene.js"
import EpilogueScene from "./scenes/EpilogueScene.js"

const config = {
	type: Phaser.AUTO,
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
	]
};

const game = new Phaser.Game(config);