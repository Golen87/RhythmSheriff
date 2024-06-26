const Data = {
	// m_shop: {
	// 	offset: 41860 / 48000,
	// 	bpm: 86,
	// 	loop: true,
	// 	start: 41860 / 48000 + overlap,
	// 	end: 2854884 / 48000 + overlap,
	// },

	bgm_practice: {
		offset: 0.127,
		bpm: 125,
		loop: true,
		start: 0.1267,
		end: 15.49,
	},
	bgm_epilogue_bad: {
		offset: 1.995,
		bpm: 135,
		loop: true,
		start: 3.329,
		end: 24.667,
	},
	bgm_epilogue_good: {
		offset: 1.195,
		bpm: 123.3,
		loop: true,
		start: 2.964,
		end: 34.114,
	},
	bgm_epilogue_great: {
		offset: 2.533,
		bpm: 152,
		loop: true,
		start: 2.533,
		end: 27.804,
	},
	bgm_game_over: {
		offset: 0.16,
		bpm: 131,
	},
	bgm_perfect_fan: {
		offset: 3.91,
		bpm: 65,
		loop: true,
		start: 7.69, // 3.512
		end: 15.11, // 19.395
	},
	jingle_anime: {
		offset: 0,
		bpm: 136,
	},
	jingle_epilogue_bad: {
		offset: 0,
		bpm: 138,
	},
	jingle_epilogue_good: {
		offset: 0,
		bpm: 138,
	},
	jingle_epilogue_great: {
		offset: 0,
		bpm: 138,
	},

	puppywestern_2: {
		offset: 0.029,
		bpm: 143,
	},
	puppywestern_2_nocues: {
		offset: 0.029,
		bpm: 143,
	},
	glow: {
		offset: 0.156,
		bpm: 155,
	},
	tapatio: {
		offset: 0.052,
		bpm: 105,
	},
};

export type MusicKey = keyof typeof Data;
export type MusicDataType = {
	[K in MusicKey]: {
		offset: number;
		bpm: number;
		loop: boolean;
		start: number;
		end: number;
	};
};

export default Data as MusicDataType;
