export interface Image {
	key: string;
	path: string;
}

export interface SpriteSheet {
	key: string;
	path: string;
	width: number;
	height: number;
}

export interface Audio {
	key: string;
	path: string;
	volume?: number;
	rate?: number;
}

const imageGlob = import.meta.glob<string>("./images/**/*", {
	query: "?url",
	import: "default",
	eager: true,
});
export const image = (path: string, key: string): Image => {
	return { key, path: imageGlob[`./images/${path}`] };
};

export const spritesheet = (
	path: string,
	key: string,
	width: number,
	height: number
): SpriteSheet => {
	return { key, width, height, path: imageGlob[`./images/${path}`] };
};

const musicGlob = import.meta.glob<string>("./music/**/*", {
	query: "?url",
	import: "default",
	eager: true,
});
export const music = (
	path: string,
	key: string,
	volume?: number,
	rate?: number
): Audio => {
	return { key, volume, rate, path: musicGlob[`./music/${path}`] };
};

const audioGlob = import.meta.glob<string>("./sounds/**/*", {
	query: "?url",
	import: "default",
	eager: true,
});
export const sound = (
	path: string,
	key: string,
	volume?: number,
	rate?: number
): Audio => {
	return { key, volume, rate, path: audioGlob[`./sounds/${path}`] };
};

const fontGlob = import.meta.glob<string>("./fonts/**/*", {
	query: "?url",
	import: "default",
	eager: true,
});
export const loadFont = async (path: string, name: string) => {
	const face = new FontFace(name, `url(${fontGlob[`./fonts/${path}`]})`, {
		style: "normal",
		weight: "400",
	});
	await face.load();
	document.fonts.add(face);
};
