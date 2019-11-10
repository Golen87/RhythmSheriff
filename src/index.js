import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import ExampleScene1 from "./ExampleScene1.js"
import ExampleScene2 from "./ExampleScene2.js"
import ExampleScene3 from "./ExampleScene3.js"

const config = {
	type: Phaser.AUTO,
	parent: "Fall Game Jam",
	width: 800,
	height: 600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		parent: "thegame",
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
		ExampleScene3,
		ExampleScene1,
		ExampleScene2,
	]
};

const game = new Phaser.Game(config);