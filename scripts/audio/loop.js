function MainLoop(interval, songAPI, scale, drumSeq, seqArray, pluckSeq) {
	return T("interval", {interval: interval}, function(count) {
		var i = count % drumSeq.length;
		/*
		if (i === 0) {
			CYM.bang();
		}
		*/
		
		if (i === 16 || i === 48 || i === 64 || i === 96 || i === 112){
			songAPI.getNote(pluckSeq[i])
		}

		drumSeq[i].forEach(function(p) { p.bang(); });

		if (Math.random() < 0.015) {
			var j = (Math.random() * drumSeq.length)|0;
			drumSeq.wrapSwap(i, j);
			seqArray.wrapSwap(i, j);
		}

	
		var noteNum = scale.wrapAt(seqArray.wrapAt(count)) + 60 

		if (i % 2 === 0 || i % 3 === 0) {
			lead.freq.linTo(noteNum.midicps(), "10ms");
		}
	});
}
