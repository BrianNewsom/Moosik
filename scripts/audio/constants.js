function Constants(){
	this.PENTATONIC_SCALE =  [0, 2, 4, 7, 9, 12];
	this.notesMap = {
		'1' : (60 + this.PENTATONIC_SCALE[0]).midicps(),
		'2' : (60 + this.PENTATONIC_SCALE[1]).midicps(),
		'3' : (60 + this.PENTATONIC_SCALE[3]).midicps(),
		'4' : (72 + this.PENTATONIC_SCALE[4]).midicps(),
		'5' : (48 + this.PENTATONIC_SCALE[3]).midicps(),
		'6' : (60 + this.PENTATONIC_SCALE[5]).midicps(),
		'7' : (72 + this.PENTATONIC_SCALE[2]).midicps(),
	};
}
