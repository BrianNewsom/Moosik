$(document).ready(function(){
	'use strict';

	var songAPI = new SongAPI();

	var handler = new Tautologistics.NodeHtmlParser.HtmlBuilder(function (error, dom) {
		if (error)
			console.log(error)
		else
			console.log('successfully parsed')
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
		

		var tempo = 'BPM' + (60 + TREE[0].length)
		var countsPerMeasure = 16
		var interval = tempo + " L" + countsPerMeasure

		var j = 0 

		mainLoop(interval, songAPI, scale, drumSeq, seqArray, pluckSeq)
	});
});
