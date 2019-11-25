export default class Sound {
	constructor(scene, key, config=null) {
		this.key = key;

		this.sounds = [
			scene.sound.add(key, config),
			scene.sound.add(key, config),
			scene.sound.add(key, config),
			scene.sound.add(key, config),
		];

		this.counter = 0;
	}

	play() {
		let index = this.counter % this.sounds.length;
		this.counter += 1;

		this.sounds[index].play();
	}

	setRate(rate) {
		for (var i = this.sounds.length - 1; i >= 0; i--) {
			this.sounds[i].setRate(rate);
		}
	}
}