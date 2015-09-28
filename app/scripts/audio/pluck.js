var RandIterator = function() {
  return function() {
    return Math.floor(Math.random() * this.notes.length);
  };
};

var PENTATONIC_SCALE =  [0, 2, 4, 7, 9, 12];
var notesMap = {
  '1' : (60 + PENTATONIC_SCALE[0]).midicps(),
  '2' : (60 + PENTATONIC_SCALE[1]).midicps(),
  '3' : (60 + PENTATONIC_SCALE[3]).midicps(),
  '4' : (72 + PENTATONIC_SCALE[4]).midicps(),
  '5' : (48 + PENTATONIC_SCALE[3]).midicps(),
  '6' : (60 + PENTATONIC_SCALE[5]).midicps(),
  '7' : (72 + PENTATONIC_SCALE[2]).midicps(),
};

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