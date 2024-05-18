import { Image, SpriteSheet, Audio } from "./util";
import { image, sound, music, loadFont, spritesheet } from "./util";

/* Images */
const images: Image[] = [
	image("background.png", "background"),
	image("foreground.png", "foreground"),
	image("title.png", "title"),
	image("ending1.png", "ending1"),
	image("ending2.png", "ending2"),
	image("ending3.png", "ending3"),

	image("tumble.png", "tumble"),
	image("shadow.png", "shadow"),
	image("wood/wood_front.png", "wood_front"),
	image("wood/wood_back.png", "wood_back"),
	image("wood/wood_block.png", "wood_block"),

	image("ratings/spiral.png", "try_again_spiral"),
	image("ratings/ok.png", "ok"),
	image("ratings/puff.png", "ok_puff"),
	image("ratings/superb.png", "superb"),
	image("ratings/superb_glow.png", "superb_glow"),
	image("ratings/star_color.png", "superb_star_color"),
	image("ratings/star_glow.png", "superb_star_glow"),
	image("ratings/star_inside.png", "superb_star_inside"),
	image("ratings/star_outline.png", "superb_star_outline"),
	image("ratings/red_star.png", "superb_red_star"),
	image("ratings/white_star.png", "superb_white_star"),
];

/* Spritesheets */
const spritesheets: SpriteSheet[] = [
	spritesheet("dog/dog_2024.png", "dog", 700, 1000),
	spritesheet("cat/cat_2024.png", "cat", 300, 550),
	spritesheet("rat/rat.png", "rat", 400, 600),
	spritesheet("plank.png", "plank", 300, 550),
	spritesheet("bullet_hole/bullet_hole.png", "bullet_hole", 80, 80),

	spritesheet("ratings/try_again.png", "try_again", 240, 96),
];

/* Audios */
const audios: Audio[] = [
	// music("title", "m_main_menu"),
	// sound("tree/rustle", "t_rustle", 0.5),

	music("BGM_EPILOGUE_BAD.ogg", "bgm_epilogue_bad"),
	music("BGM_EPILOGUE_GOOD.ogg", "bgm_epilogue_good"),
	music("BGM_EPILOGUE_GREAT.ogg", "bgm_epilogue_great"),
	music("BGM_PERFECT_FAN.ogg", "bgm_perfect_fan"),
	music("JINGLE_ANIME.ogg", "jingle_anime"),
	music("JINGLE_EPILOGUE_BAD.ogg", "jingle_epilogue_bad"),
	music("JINGLE_EPILOGUE_GOOD.ogg", "jingle_epilogue_good"),
	music("JINGLE_EPILOGUE_GREAT.ogg", "jingle_epilogue_great"),
	music("BGM_PRACTICE.ogg", "bgm_practice"),
	music("puppywestern_2_nocues.mp3", "puppywestern_2_nocues"),
	music("Shady Monk & That Andy Guy - Tapatio.ogg", "tapatio"),

	sound("cowbell.wav", "cowbell"),
	sound("miss.wav", "miss"),
	sound("shoot_1.wav", "shoot_1"),
	sound("shoot_2.wav", "shoot_2"),
	sound("shoot_3.wav", "shoot_3"),
	sound("karate_kick_miss.wav", "karate_kick_miss"),
	sound("karate_kick_swing.wav", "karate_kick_swing"),
	sound("target_destroyed_1.wav", "target_destroyed_1"),
	sound("target_destroyed_2.wav", "target_destroyed_2"),
	sound("karate_bomb_kick.wav", "karate_bomb_kick"),

	sound("destroy_pieces.wav", "destroy_pieces"),
	sound("eject.wav", "eject"),
	sound("fade_out.wav", "fade_out"),
	sound("metal_eject.wav", "metal_eject"),
	sound("miss_spin.wav", "miss_spin"),
	sound("robot_eject.wav", "robot_eject"),
	sound("robot_withdraw.wav", "robot_withdraw"),
	sound("flip.wav", "flip"),

	sound("Mato/Back.wav", "Back"),
	sound("Mato/ButtonDown.wav", "ButtonDown"),
	sound("Mato/ButtonUp.wav", "ButtonUp"),
	sound("Mato/Clap.wav", "Clap"),
	sound("Mato/ClickHigh.wav", "ClickHigh"),
	sound("Mato/ClickLow.wav", "ClickLow"),
	sound("Mato/Cowbell.wav", "Cowbell"),
	sound("Mato/Crow.wav", "Crow"),
	sound("Mato/Keypress.wav", "Keypress"),
	sound("Mato/MinigameClose.wav", "MinigameClose"),
	sound("Mato/MinigameHover.wav", "MinigameHover"),
	sound("Mato/MinigameLaunch.wav", "MinigameLaunch"),
	sound("Mato/MinigameOpen.wav", "MinigameOpen"),
	sound("Mato/MinigameWindow.wav", "MinigameWindow"),
	sound("Mato/Miss2.wav", "Miss2"),
	sound("Mato/Miss3.wav", "Miss3"),
	sound("Mato/Miss4.wav", "Miss4"),
	sound("Mato/Miss.wav", "Miss"),
	sound("Mato/Nature.wav", "Nature"),
	sound("Mato/Page.wav", "Page"),
	sound("Mato/Punch.wav", "Punch"),
	sound("Mato/RatingOK.wav", "RatingOK"),
	sound("Mato/Results1.wav", "Results1"),
	sound("Mato/Results2.wav", "Results2"),
	sound("Mato/Shrink.wav", "Shrink"),
	sound("Mato/TapDown.wav", "TapDown"),
	sound("Mato/TapUp.wav", "TapUp"),
	sound("Mato/Woodblock2.wav", "Woodblock2"),
	sound("Mato/Woodblock.wav", "Woodblock"),

	sound("Jwatch/catcue2.wav", "cat_cue"),
	sound("Jwatch/ratcue2.wav", "rat_cue"),

	sound("girl_one.wav", "girl_one"),
	sound("girl_two.wav", "girl_two"),
	sound("girl_three.wav", "girl_three"),
	sound("girl_four.wav", "girl_four"),
	sound("audience_boo.wav", "audience_boo"),
	sound("audience_gasp.wav", "audience_gasp"),
	sound("audience_clap.wav", "audience_clap"),
	sound("audience_cheer.wav", "audience_cheer"),
	sound("audience_cheer2.wav", "audience_cheer2"),
];

/* Fonts */
await loadFont("TEXAS BOLD.otf", "Texas");
await loadFont("Wii_NTLG_Proportional_Gothic.ttf", "Wii");

export { images, spritesheets, audios };
