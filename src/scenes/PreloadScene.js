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
		this.load.image('shadow', 'assets/images/shadow.png');
		this.load.image('wood_front', 'assets/images/wood/wood_front.png');
		this.load.image('wood_back', 'assets/images/wood/wood_back.png');
		this.load.image('wood_block', 'assets/images/wood/wood_block.png');

		this.load.spritesheet('dog', 'assets/images/dog/dog.png', { frameWidth: 700, frameHeight: 1000 });
		this.load.spritesheet('cat', 'assets/images/cat/cat.png', { frameWidth: 400, frameHeight: 548 });
		this.load.spritesheet('rat', 'assets/images/rat/rat.png', { frameWidth: 400, frameHeight: 600 });
		this.load.spritesheet('bullet_hole', 'assets/images/bullet_hole/bullet_hole.png', { frameWidth: 80, frameHeight: 80 });

		this.load.spritesheet('try_again', 'assets/images/ratings/try_again.png', { frameWidth: 240, frameHeight: 96 });
		this.load.image('try_again_spiral', 'assets/images/ratings/spiral.png');
		this.load.image('ok', 'assets/images/ratings/ok.png');
		this.load.image('ok_puff', 'assets/images/ratings/puff.png');
		this.load.image('superb', 'assets/images/ratings/superb.png');
		this.load.image('superb_glow', 'assets/images/ratings/superb_glow.png');
		this.load.image('superb_star_color', 'assets/images/ratings/star_color.png');
		this.load.image('superb_star_glow', 'assets/images/ratings/star_glow.png');
		this.load.image('superb_star_inside', 'assets/images/ratings/star_inside.png');
		this.load.image('superb_star_outline', 'assets/images/ratings/star_outline.png');
		this.load.image('superb_red_star', 'assets/images/ratings/red_star.png');
		this.load.image('superb_white_star', 'assets/images/ratings/white_star.png');


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
		//this.load.audio('puppywestern_2', 'assets/music/puppywestern_2.mp3');
		this.load.audio('puppywestern_2_nocues', 'assets/music/puppywestern_2_nocues.mp3');
		//this.load.audio('glow', 'assets/music/Glow.mp3');
		//this.load.audio('samurai_slice', 'assets/music/Samurai Slice - Rhythm Heaven Fever.ogg');


		this.load.audio('cowbell', 'assets/audio/cowbell.wav');
		this.load.audio('miss', 'assets/audio/miss.wav');
		this.load.audio('shoot_1', 'assets/audio/shoot_1.wav');
		this.load.audio('shoot_2', 'assets/audio/shoot_2.wav');
		this.load.audio('shoot_3', 'assets/audio/shoot_3.wav');
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

		this.load.audio('Back', 'assets/audio/Mato/Back.wav');
		this.load.audio('ButtonDown', 'assets/audio/Mato/ButtonDown.wav');
		this.load.audio('ButtonUp', 'assets/audio/Mato/ButtonUp.wav');
		this.load.audio('Clap', 'assets/audio/Mato/Clap.wav');
		this.load.audio('ClickHigh', 'assets/audio/Mato/ClickHigh.wav');
		this.load.audio('ClickLow', 'assets/audio/Mato/ClickLow.wav');
		this.load.audio('Cowbell', 'assets/audio/Mato/Cowbell.wav');
		this.load.audio('Crow', 'assets/audio/Mato/Crow.wav');
		this.load.audio('Keypress', 'assets/audio/Mato/Keypress.wav');
		this.load.audio('MinigameClose', 'assets/audio/Mato/MinigameClose.wav');
		this.load.audio('MinigameHover', 'assets/audio/Mato/MinigameHover.wav');
		this.load.audio('MinigameLaunch', 'assets/audio/Mato/MinigameLaunch.wav');
		this.load.audio('MinigameOpen', 'assets/audio/Mato/MinigameOpen.wav');
		this.load.audio('MinigameWindow', 'assets/audio/Mato/MinigameWindow.wav');
		this.load.audio('Miss2', 'assets/audio/Mato/Miss2.wav');
		this.load.audio('Miss3', 'assets/audio/Mato/Miss3.wav');
		this.load.audio('Miss4', 'assets/audio/Mato/Miss4.wav');
		this.load.audio('Miss', 'assets/audio/Mato/Miss.wav');
		this.load.audio('Nature', 'assets/audio/Mato/Nature.wav');
		this.load.audio('Page', 'assets/audio/Mato/Page.wav');
		this.load.audio('Punch', 'assets/audio/Mato/Punch.wav');
		this.load.audio('RatingOK', 'assets/audio/Mato/RatingOK.wav');
		this.load.audio('Results1', 'assets/audio/Mato/Results1.wav');
		this.load.audio('Results2', 'assets/audio/Mato/Results2.wav');
		this.load.audio('Shrink', 'assets/audio/Mato/Shrink.wav');
		this.load.audio('TapDown', 'assets/audio/Mato/TapDown.wav');
		this.load.audio('TapUp', 'assets/audio/Mato/TapUp.wav');
		this.load.audio('Woodblock2', 'assets/audio/Mato/Woodblock2.wav');
		this.load.audio('Woodblock', 'assets/audio/Mato/Woodblock.wav');

		this.load.audio('cat_cue', 'assets/audio/Jwatch/catcue.wav');
		this.load.audio('rat_cue', 'assets/audio/Jwatch/ratcue.wav');

		//this.load.audio('boy_one', 'assets/audio/boy_one.wav');
		//this.load.audio('boy_two', 'assets/audio/boy_two.wav');
		//this.load.audio('boy_three', 'assets/audio/boy_three.wav');
		//this.load.audio('boy_four', 'assets/audio/boy_four.wav');
		this.load.audio('girl_one', 'assets/audio/girl_one.wav');
		this.load.audio('girl_two', 'assets/audio/girl_two.wav');
		this.load.audio('girl_three', 'assets/audio/girl_three.wav');
		this.load.audio('girl_four', 'assets/audio/girl_four.wav');
		this.load.audio('audience_boo', 'assets/audio/audience_boo.wav');
		this.load.audio('audience_gasp', 'assets/audio/audience_gasp.wav');
		this.load.audio('audience_clap', 'assets/audio/audience_clap.wav');
		this.load.audio('audience_cheer', 'assets/audio/audience_cheer.wav');
		this.load.audio('audience_cheer2', 'assets/audio/audience_cheer2.wav');


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


		/* Plug-ins */

        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexroundrectangleplugin.min.js', true);    
	}

	onLoadProgress(progress) {
		this.loading.setText(`Loading... ${Math.round(progress * 100)}%`);
	}

	create() {
		this.scene.start("TitleScene");
		//this.scene.start("LevelScene");
		//this.scene.start("EvaluationScene", {rating:'good'});
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