import BaseScene from "@/scenes/BaseScene";

export default class Sound {
	private key: string;
	private sounds: Phaser.Sound.WebAudioSound[];
	private counter: number;

	constructor(
		scene: BaseScene,
		key: string,
		config?: Phaser.Types.Sound.SoundConfig
	) {
		this.key = key;

		this.sounds = [
			scene.sound.add(key, config) as Phaser.Sound.WebAudioSound,
			scene.sound.add(key, config) as Phaser.Sound.WebAudioSound,
			scene.sound.add(key, config) as Phaser.Sound.WebAudioSound,
			scene.sound.add(key, config) as Phaser.Sound.WebAudioSound,
		];

		this.counter = 0;
	}

	play() {
		let index = this.counter % this.sounds.length;
		this.counter += 1;

		this.sounds[index].play();
	}

	stop() {
		this.sounds.forEach((sound) => sound.stop());
	}

	setRate(rate: number) {
		this.sounds.forEach((sound) => (sound.rate = rate));
	}
}
