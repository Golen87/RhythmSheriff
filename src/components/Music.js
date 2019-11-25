import MusicData from "./../components/MusicData.js";

export default class Music extends Phaser.Sound.WebAudioSound {
	constructor(scene, key, config=null) {
		super(scene.sound, key, config);
		scene.sound.sounds.push(this);
		this.key = key;

		if (!MusicData[key]) {
			throw "Music data missing for: " + key;
		}
		let custom = MusicData[key] || {};

		this.offset = custom.offset;
		this.bpm = custom.bpm;
		this.loop = custom.loop || false;

		if (this.loop) {
			this.start = custom.start;
			this.end = custom.end;
			this.setLoop(true);
		}
		else {
			this.start = this.offset;
			this.end = this.duration;
			this.setLoop(false);
		}

		this.speed = 60 / this.bpm;
		this.maxBar = Math.round((this.end - this.start) / this.speed);
	}

	update(time, delta) {
		super.update(this, time, delta);


		if (this.isPlaying) {
			if (this.loop) {
				if (this.getCurrentTime() > this.end) {
					this.setSeek(this.getCurrentTime() - (this.end - this.start));
					console.log("Music loop", this.getCurrentTime());
				}
			}

			let barTime = this.getBarTime();
			if (barTime >= 0) {
				if (Math.floor(barTime) != Math.floor(this._prevBarTime)) {
					this.emit('bar', Math.floor(barTime));
				}
				if (Math.floor(4*barTime) != Math.floor(4*this._prevBarTime)) {
					this.emit('beat', Math.floor(4*barTime)/4);
				}
			}
			this._prevBarTime = barTime;
		}
	}


	getBarTime() {
		let time = this.getCurrentTime() - this.offset;
		return time / this.speed;
	}

	getBar() {
		return Math.floor(this.getBarTime());
	}
}