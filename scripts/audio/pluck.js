function Note(freq, volume) {
	/* Pick a tone */
	this.tone = new T('pluck', {freq:freq, mul:volume}).bang();

	this.applyDelay = function(_time,_fb,_mix) {
		// Applies Delay to this.tone
		this.tone = new T('delay', {time:_time, fb:_fb, mix:_mix}, this.tone);
	};

	this.applyReverb = function(_room,_damp,_mix){
		// Applies Reverb with given parameters to this.tone
		this.tone = new T('reverb', {room:_room, damp:_damp, mix:_mix},this.tone);
	};

	this.applyRelease = function(timeout) {
		var table = [volume,[0,timeout]];
		this.tone = new T('env', {table:table}, this.tone).on('ended', function() {
			this.pause();
		}).bang().play();
	};

	this.applyDelay(1250,0.4,0.1);
	// this.applyReverb(0.9,0.9,0.25);
	this.applyRelease(5000);
	return this.tone;
}