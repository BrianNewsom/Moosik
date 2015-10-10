function MoosikMain() {

	'use strict';
	var main = this;
	var delayTime = 2000; // in ms
	
	// Delay execution to avoid stutter
	setTimeout(function(){	

		main.playing = false;

		var constants = new Constants();
		var songAPI = new SongAPI(constants);

		var handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(function (error, dom) {
			if (error)
				console.log(error)
				return;
		});

		var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
		parser.parseComplete(document.body.innerHTML);

		var parsedHTML = handler.dom;

		var TREE = [];

		parse(parsedHTML, TREE)

		var scale= songAPI.buildScale(TREE[1])

		songAPI.buildDrums(TREE[0], function(drumSeqShort) {
			var drumSeq = drumSeqShort.wrapExtend(128);

			var seqArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

			var pat3 = songAPI.buildPluck(TREE[2]);
			var pluckSeq = pat3.wrapExtend(128);
			

			
			var tempo = Math.min(140, 60 + TREE[0].length);
			var tempoText = 'BPM' + tempo ;
			var countsPerMeasure = 16;
			var interval = tempoText + " L" + countsPerMeasure;

			var j = 0;

			var instruments = new Instruments();
			var synth = instruments.synth;
			var lead = instruments.lead;
			var loop = new MainLoop(interval, songAPI, scale, drumSeq, seqArray, pluckSeq, lead);

			var control = new Control(loop, synth);
			
			// Start loop initially
			control.start();
			main.playing = true;

			main.start = function() {
				// Global start & (accesses control)
				if (!control){
					var control = new Control(loop, synth);	
				}
				control.start();
				main.playing = true;
			}
			
			main.stop = function() {
				// Global stop (accesses control)
				control.stop();
				main.playing = false;
			}
			
			main.toggle = function() {
				if (main.playing) {
					main.stop();
				} else {
					main.start();
				}
			}
		});
	}, delayTime);
}

// We need an object to start and stop from the chrome extension
var moosikMain = new MoosikMain();
