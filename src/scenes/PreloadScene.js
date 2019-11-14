export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super({key: 'PreloadScene'});
	}

	preload() {
		this.cameras.main.setBackgroundColor(0x111111);

		this.loading = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Loading...", { font: "20px Courier" });
		this.loading.setOrigin(0.5);

		this.load.on('progress', this.onLoadProgress, this);


		/* Images */
		this.load.image('background', 'assets/images/background.png');
		this.load.image('title', 'assets/images/title.png');

		this.load.image('tumble', 'assets/images/tumble.png');
		this.load.image('rat', 'assets/images/rat/rat01.png');
		this.load.image('wood_front', 'assets/images/wood/wood_front.png');
		this.load.image('wood_back', 'assets/images/wood/wood_back.png');
		this.load.image('wood_block', 'assets/images/wood/wood_block.png');

		this.load.spritesheet('dog', 'assets/images/dog/dog.png', { frameWidth: 700, frameHeight: 1000 });
		this.load.spritesheet('cat', 'assets/images/cat/cat.png', { frameWidth: 400, frameHeight: 548 });
		this.load.spritesheet('bullet_hole', 'assets/images/bullet_hole/bullet_hole.png', { frameWidth: 80, frameHeight: 80 });


		/* Audio */
		this.load.audio('bgm_epilogue_bad', 'assets/music/BGM_EPILOGUE_BAD.ogg');
		this.load.audio('bgm_epilogue_good', 'assets/music/BGM_EPILOGUE_GOOD.ogg');
		this.load.audio('bgm_epilogue_great', 'assets/music/BGM_EPILOGUE_GREAT.ogg');
		//this.load.audio('bgm_game_over', 'assets/music/BGM_GAME_OVER.ogg');
		this.load.audio('bgm_perfect_fan', 'assets/music/BGM_PERFECT_FAN.ogg');
		this.load.audio('jingle_anime', 'assets/music/JINGLE_ANIME.ogg');
		this.load.audio('jingle_epilogue_bad', 'assets/music/JINGLE_EPILOGUE_BAD.ogg');
		this.load.audio('jingle_epilogue_good', 'assets/music/JINGLE_EPILOGUE_GOOD.ogg');
		this.load.audio('jingle_epilogue_great', 'assets/music/JINGLE_EPILOGUE_GREAT.ogg');
		this.load.audio('bgm_practice', 'assets/music/BGM_PRACTICE.ogg');
		//this.load.audio('puppywestern_2_loop', 'assets/music/puppywestern_2_loop.mp3');
		//this.load.audio('puppywestern_2_loop_nocues', 'assets/music/puppywestern_2_loop_nocues.mp3');
		this.load.audio('puppywestern_2', 'assets/music/puppywestern_2.mp3');
		//this.load.audio('puppywestern_2_nocues', 'assets/music/puppywestern_2_nocues.mp3');
		//this.load.audio('glow', 'assets/music/Glow.mp3');

		this.load.audio('cowbell', 'assets/audio/cowbell.wav');
		this.load.audio('miss', 'assets/audio/miss.wav');
		this.load.audio('shoot_1', 'assets/audio/shoot_1.wav');
		this.load.audio('shoot_2', 'assets/audio/shoot_2.wav');
		this.load.audio('shoot_3', 'assets/audio/shoot_3.wav');
		this.load.audio('shoot_4', 'assets/audio/shoot_4.wav');
		this.load.audio('karate_kick_miss', 'assets/audio/karate_kick_miss.wav');
		this.load.audio('karate_kick_swing', 'assets/audio/karate_kick_swing.wav');
		this.load.audio('target_destroyed_1', 'assets/audio/target_destroyed_1.wav');
		this.load.audio('target_destroyed_2', 'assets/audio/target_destroyed_2.wav');
		this.load.audio('karate_bomb_kick', 'assets/audio/karate_bomb_kick.wav');

		this.load.audio('destroy_pieces', 'assets/audio/destroy_pieces.wav');
		this.load.audio('eject', 'assets/audio/eject.wav');
		this.load.audio('fade_out', 'assets/audio/fade_out.wav');
		this.load.audio('metal_eject', 'assets/audio/metal_eject.wav');
		this.load.audio('miss_spin', 'assets/audio/miss_spin.wav');
		this.load.audio('robot_eject', 'assets/audio/robot_eject.wav');
		this.load.audio('robot_withdraw', 'assets/audio/robot_withdraw.wav');
		this.load.audio('flip', 'assets/audio/flip.wav');

		//this.load.audio('boy_one', 'assets/audio/boy_one.wav');
		//this.load.audio('boy_two', 'assets/audio/boy_two.wav');
		//this.load.audio('boy_three', 'assets/audio/boy_three.wav');
		//this.load.audio('boy_four', 'assets/audio/boy_four.wav');
		this.load.audio('girl_one', 'assets/audio/girl_one.wav');
		this.load.audio('girl_two', 'assets/audio/girl_two.wav');
		this.load.audio('girl_three', 'assets/audio/girl_three.wav');
		this.load.audio('girl_four', 'assets/audio/girl_four.wav');


		//this.load.audio('70', 'assets/audio/Sample 70.wav'); // audience_boo
		//this.load.audio('71', 'assets/audio/Sample 71.wav'); // audience_cheer
		//this.load.audio('72', 'assets/audio/Sample 72.wav'); // audience_clap
		//this.load.audio('73', 'assets/audio/Sample 73.wav'); // audience_cheer2
		//this.load.audio('74', 'assets/audio/Sample 74.wav'); // audience_gasp
		//this.load.audio('82', 'assets/audio/Sample 82.wav'); // click
		//this.load.audio('103', 'assets/audio/Sample 103.wav'); // cowbell
		//this.load.audio('131', 'assets/audio/Sample 131.wav'); // hihat
		//this.load.audio('132', 'assets/audio/Sample 132.wav'); // cymbal
		//this.load.audio('133', 'assets/audio/Sample 133.wav'); // reverse_cymbal
		//this.load.audio('134', 'assets/audio/Sample 134.wav'); // snare
		//this.load.audio('135', 'assets/audio/Sample 135.wav'); // snare2
		//this.load.audio('136', 'assets/audio/Sample 136.wav'); // smack
		//this.load.audio('137', 'assets/audio/Sample 137.wav'); // drum
		//this.load.audio('138', 'assets/audio/Sample 138.wav'); // swoosh
		//this.load.audio('153', 'assets/audio/Sample 153.wav'); // piano
		//this.load.audio('201', 'assets/audio/Sample 201.wav'); // error
		//this.load.audio('202', 'assets/audio/Sample 202.wav'); // loud_smack
		//this.load.audio('203', 'assets/audio/Sample 203.wav'); // shell_bounce
		//this.load.audio('204', 'assets/audio/Sample 204.wav'); // shells_rain
		//this.load.audio('205', 'assets/audio/Sample 205.wav'); // shells_rain
		//this.load.audio('206', 'assets/audio/Sample 206.wav'); // metal_pan
		//this.load.audio('207', 'assets/audio/Sample 207.wav'); // hihat
		//this.load.audio('211', 'assets/audio/Sample 211.wav'); // rope_swing
		//this.load.audio('293', 'assets/audio/Sample 293.wav'); // glass crash
		//this.load.audio('295', 'assets/audio/Sample 295.wav'); // shoot
		//this.load.audio('296', 'assets/audio/Sample 296.wav'); // smack
		//this.load.audio('297', 'assets/audio/Sample 297.wav'); // drum smack
		//this.load.audio('298', 'assets/audio/Sample 298.wav'); // smack crumble
		//this.load.audio('299', 'assets/audio/Sample 299.wav'); // small shoot
		//this.load.audio('308', 'assets/audio/Sample 308.wav'); // trampoline
		//this.load.audio('309', 'assets/audio/Sample 309.wav'); // gas
		//this.load.audio('310', 'assets/audio/Sample 310.wav'); // mechanical screw
		//this.load.audio('576', 'assets/audio/Sample 576.wav'); // click
		//this.load.audio('577', 'assets/audio/Sample 577.wav'); // "huh"
		//this.load.audio('578', 'assets/audio/Sample 578.wav'); // "ikuyo"
		//this.load.audio('579', 'assets/audio/Sample 579.wav'); // "dekaini"
		//this.load.audio('580', 'assets/audio/Sample 580.wav'); // "ugh"
		//this.load.audio('581', 'assets/audio/Sample 581.wav'); // "yo"
		//this.load.audio('582', 'assets/audio/Sample 582.wav'); // "see"
		//this.load.audio('583', 'assets/audio/Sample 583.wav'); // "hei"
		//this.load.audio('584', 'assets/audio/Sample 584.wav'); // "uun"
		//this.load.audio('585', 'assets/audio/Sample 585.wav'); // "yamete"
		//this.load.audio('586', 'assets/audio/Sample 586.wav'); // "fei"
		//this.load.audio('587', 'assets/audio/Sample 587.wav'); // "bop"
		//this.load.audio('588', 'assets/audio/Sample 588.wav'); // "dop"
		//this.load.audio('589', 'assets/audio/Sample 589.wav'); // "don"
		//this.load.audio('590', 'assets/audio/Sample 590.wav'); // "donn"
		//this.load.audio('591', 'assets/audio/Sample 591.wav'); // "dn"
		//this.load.audio('592', 'assets/audio/Sample 592.wav'); // "doun"
		//this.load.audio('593', 'assets/audio/Sample 593.wav'); // "tei"
		//this.load.audio('594', 'assets/audio/Sample 594.wav'); // "mmn"
		//this.load.audio('595', 'assets/audio/Sample 595.wav'); // "zu"
		//this.load.audio('596', 'assets/audio/Sample 596.wav'); // "taan"
		//this.load.audio('597', 'assets/audio/Sample 597.wav'); // "wuh"
		//this.load.audio('598', 'assets/audio/Sample 598.wav'); // "wup"
		//this.load.audio('599', 'assets/audio/Sample 599.wav'); // "yoh"
		//this.load.audio('609', 'assets/audio/Sample 609.wav'); // menu click
		//this.load.audio('612', 'assets/audio/Sample 612.wav'); // game over
	}

	onLoadProgress(progress) {
		this.loading.setText(`Loading... ${Math.round(progress * 100)}%`);
	}

	create() {
		//this.scene.start("LevelScene");
		this.scene.start("TitleScene");
	}

	update(time, delta) {
	}


	get W() { return this.cameras.main.displayWidth; }
	get H() { return this.cameras.main.displayHeight; }
	get CX() { return this.cameras.main.centerX; }
	get CY() { return this.cameras.main.centerY; }

	fitToScreen(image) {
		image.setScale(Math.max(this.W / image.width, this.H / image.height));
	}
}