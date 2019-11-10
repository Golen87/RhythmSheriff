import Player from "./Player.js";
import Path from "./Path.js";

const WALL = 0;
const BALL = 1;
const HOOK = 2;

const HERO_SIZE = 20;
const HOOK_SPEED = 50;
const CONSTRAINT_SPEED = 4;


export default class ExampleScene1 extends Phaser.Scene {
	constructor() {
		super({key: 'ExampleScene1'});
	}

	preload() {
		this.load.image('circle', 'src/assets/circle.png');
		this.load.image('small', 'src/assets/small.png');
		this.load.spritesheet( 'items', 'src/assets/items.png', { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		this.matter.world.update30Hz();
		this.matter.world.setBounds(10, 10, 1000 - 20, 600 - 20);

		// placing some random static boxes labeled as WALL
		for (let i = 0; i < 10; i++) {
			let posX = Phaser.Math.Between(0, this.game.config.width);
			let posY = Phaser.Math.Between(0, this.game.config.height);
			let width = Phaser.Math.Between(50, 200);
			let height = Phaser.Math.Between(50, 200);
			let poly = this.matter.add.rectangle(posX, posY, width, height, {
				isStatic: true
			});
			poly.label = WALL;
		}

		// adding a bouncing ball labeled as BALL
		this.hero = this.matter.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, HERO_SIZE, HERO_SIZE, {
			restitution: 0.5
		});
		this.hero.label = BALL;

		// the hook
		this.hook = null;


		// event listeners
		this.input.on("pointerdown", this.fireHook, this);

		// no ropes at the beginning
		this.rope = null;

		// collision listener
		this.matter.world.on("collisionstart", function(e, b1, b2) {

			// when the ball collides with something, we'll remove the hook
			if(b1.label == BALL || b2.label == BALL) {
				console.log("ball");
				//this.releaseHook();
				return;
			}

			// when the hook collides with something, let's make it static and create the joint
			if((b1.label == HOOK || b2.label == HOOK) && !this.rope) {
				console.log("hook");

				// make the hook static
				Phaser.Physics.Matter.Matter.Body.setStatic(this.hook, true);

				// calculate the distance between the ball and the hook
				let distance = Phaser.Math.Distance.Between(this.hero.position.x, this.hero.position.y, this.hook.position.x, this.hook.position.y);

				// is the distance fairly greater than hero size?
				//if(distance > HERO_SIZE * 2) {

					// add the constraint
					this.rope = this.matter.add.constraint(this.hero, this.hook, distance, 0.1);
				//}

			}
		}, this)



		//this.scene.start("ClickScene");

		this.circleImage = this.add.image(400, 300, 'circle');
		this.circleImage.setScale(0.4);

		this.sword = this.add.image(0, 400, 'items');
		this.sword.setOrigin(0, 0);
		this.sword.setScale(10);
		this.sword.setInteractive();
		this.sword.on('pointerdown', function(pointer) {
			console.log('click', pointer);
		});

		this.player = new Player(this, 700, 100);
		//this.player.setTint(0xffff00);
		//this.player.setInteractive();
		//this.player.on('pointerdown', function(pointer) {
		//	this.setScale(0.9, 0.9);
		//});
		//this.input.keyboard.on('keyup_D', function(event) {
		//	this.player.x += 10;
		//}, this);
		//this.input.on('pointerdown', function(event) {
		//	this.player.x = event.x;
		//	this.player.y = event.y;
		//}, this);
		this.input.keyboard.on('keyup_P', function(event) {
			let physicsImage = this.physics.add.image(this.player.x, this.player.y, 'small');
			physicsImage.setVelocity(
				Phaser.Math.RND.integerInRange(-100, 100),
				-300
			);
		}, this);



		this.path = new Path(this,
			new Phaser.Math.Vector2(50, 50),
			new Phaser.Math.Vector2(800, 500)
		);



		this.input.keyboard.on('keyup', function(event) {
			if (event.key == '2') {
				this.scene.start("ExampleScene2");
			}
			if (event.key == '3') {
				this.scene.start("ExampleScene3");
			}
			if (event.key == '4') {
				this.scene.start("ClickScene");
			}
		}, this);


		//this.graphics = this.add.graphics();
		//this.graphics.setDefaultStyles({
		//	lineStyle: {
		//		width: 1,
		//		color: 0xff0000,
		//		alpha: 1
		//	},
		//	fillStyle: {
		//		color: 0x00ff00,
		//		alpha: 1
		//	}
		//});
		//this.circle = new Phaser.Geom.Circle(100, 100, 20);
		//this.circle2 = new Phaser.Geom.Circle(100, 200, 40);
		//this.graphics.fillStyle(0x0000FF, 1.0);
		//this.graphics.fillCircleShape(this.circle); // circle: {x, y, radius}
		//this.graphics.fillCircle(200, 100, 30);
		//this.graphics.strokeCircleShape(this.circle2);  // circle: {x, y, radius}
		//this.graphics.strokeCircle(200, 200, 50);


		// Mouse input test
		this.input.on('pointerdown', function(pointer) {
			this.path.setPoint(pointer);
		}, this);
		this.input.on('pointerup', function(pointer) {
			this.releaseHook();
			console.log("Abort");
			// ...
		}, this);
	}

		// method to fire the hook
	fireHook(e) {

		// destroy current constraint
		this.releaseHook();

		// calculate the angle between the pointer and the ball
		let angle = Phaser.Math.Angle.Between(this.hero.position.x, this.hero.position.y, e.position.x, e.position.y);

		this.hook = this.matter.add.rectangle(this.hero.position.x + (HERO_SIZE * 2) * Math.cos(angle), this.hero.position.y + (HERO_SIZE * 2) * Math.sin(angle), 10, 10);
		this.hook.label = HOOK;

		// give the hook the proper velocity
		Phaser.Physics.Matter.Matter.Body.setVelocity(this.hook, {
			x: HOOK_SPEED * Math.cos(angle),
			y: HOOK_SPEED * Math.sin(angle)
		});
	}

	// method to remove the hook
	releaseHook() {

		// is there a constraint? Remove it
		if(this.rope) {
			this.matter.world.removeConstraint(this.rope);
			this.rope = null;
		}

		if(this.hook) {
			this.matter.world.remove(this.hook);
		}
	}

	// method to be executed at every frame
	update(delta) {
		this.player.update();
		this.path.update(delta, this.player);

		// is there a constraint? Shrink it
		if(this.rope) {
			let pull_factor = Math.max((1 - Math.exp((1 - this.rope.length/60) / 1.5)), 0);

			//const MAX_ROPE_LENGTH = 50;
			//let pull_factor = Math.min(Math.max(this.rope.length - MAX_ROPE_LENGTH, 0), MAX_ROPE_LENGTH) / MAX_ROPE_LENGTH;
			console.log(this.rope.length, pull_factor);
			this.rope.length -= pull_factor * CONSTRAINT_SPEED;

			// rope too short? Remove it
			//if(this.rope.length <= HERO_SIZE * 2) {
			//	this.releaseHook();
			//}
		}
	}
}