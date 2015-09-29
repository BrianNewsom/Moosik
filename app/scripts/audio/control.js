function Control(loop){
	this.loop = loop;
	this.synth = synth;

	this.stop = function() {
		this.loop.stop();
		this.synth.pause();
	}
	
	this.start = function() {
		this.loop.start();	
		this.synth.play();
	}
}
