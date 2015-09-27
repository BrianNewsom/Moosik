$(document).ready(function(){
'use strict';

T("audio").load("http://hackcu-win.github.io/Moosik/audio/drumkit.wav", function() {
var wav = this;

var RandIterator = function() {
  return function() {
    return Math.floor(Math.random() * this.notes.length);
  };
};

var notesMap = {
  'E' : 329.6,
  'F' : 349.2,
  'G' : 392.0,
  'A' : 440.0,
  'B' : 493.9,
  'C' : 261.6,
  'D' : 293.7,
};

var pentatonic = {
  name: 'Pentatonic Song',
  notes: _.map(['G','A','B','D','E'], function(n) { return notesMap[n]; }),
  iterator: new RandIterator()
};
// TYPES OF NOTES

var BD  = wav.slice(   0,  500).set({bang:false});
var SD  = wav.slice( 500, 1000).set({bang:false});
var HH1 = wav.slice(1000, 1500).set({bang:false, mul:0.2});
var HH2 = wav.slice(1500, 2000).set({bang:false, mul:0.2});
var CYM = wav.slice(2000).set({bang:false, mul:0.2});

function Note(freq, volume, inst) {
		/* Pick a tone */
		switch (inst){
			case 'lead':
				this.tone = T("saw", {freq:T("param"), mul: volume * 0.3 });
				this.tone.freq.linTo(freq, "100ms");
				break;
			default:
				this.tone = new T('pluck', {freq:freq, mul:volume}).bang();
		}

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

		/*
    this.applyDelay(1250,0.4,0.1);
    this.applyReverb(0.9,0.9,0.25);
		*/

    this.applyRelease(5000);
    return this.tone;
}

function SongAPI() {
	this.notesPlayed = 0;
	var self = this;

	this.getNote = function(tag, depth) {
		// Get note based on element
		var note = this.buildNote(tag, depth)
		this.notesPlayed++;
		return note;
	};
	
	this.buildNote = function(tag, depth) {
		var volume = Math.random();
		var inst = ''

		switch(depth) {
			case 1000:
				break;
			default:
				switch(tag) {
					case 'a':
						return new Note(notesMap['E'], volume, inst);
						break
					case 'p':
						return new Note(notesMap['D'], volume, inst);
						break
					case 'div':
						return new Note(notesMap['G'], volume, inst);
						break
					case 'ul':
						return new Note(notesMap['G'], volume, inst);
						break
					case 'li':
						return new Note(notesMap['G'], volume, inst);
						break
					case 'span':
						return new Note(notesMap['G'], volume, inst);
						break
					case 'script':
						return new Note(notesMap['G'], volume, inst);
						break
					default:
						return new Note(notesMap['A'], volume, inst);
				}
		}
	}

}

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

function AudioGenerator(parsedHTML) {
	this.html = parsedHTML;
	this.nodes = [];
};

AudioGenerator.prototype = {
	run: function() {
		for (var i = 0 ; i < this.html.length ; i++) {
			// New nodes at depth 0
			if (this.html[i] && this.html[i].name)
				var n = new AudioNode(this.html[i], 0, i, false)
				n.exec()
				this.nodes.push(n);
		}
		return this.nodes
	}
}

function AudioNode(node, depth, childNo, playChildren) {
	this.children = [];
	this.node = node;
	this.depth = depth;
	// Child number
	this.childNo = childNo;
	this.playChildren = playChildren || true;
	this.replayTime = 20000;
}

// in ms
var DELAYBETWEENLAYERS = 4000;
var DELAYBETWEENCHILDREN = 250;
var MAXLOOPLENGTH = 20000;

AudioNode.prototype = {
	init: function(){
		if (this.node.children){
			for (var i = 0 ; i < this.node.children.length; i++ ){
				// for each real tag
				if (this.node.children[i].name){
					this.children.push(this.node.children[i])
				}
			}
		}
	},
	// Play nested layers below
	setChildren: function(){
		var selfi = this;
		var numChildren = this.children.length;
		this.loops = 0;
		selfi.startChildren(false);
	},

	startChildren: function(recurse){
		var node = this;
		if (node.children.length && node.children[0] && node.playChildren){
			for (var i = 0 ; i < node.children.length ; i++){
				var child = node.children[i]
				new AudioNode(child, node.depth+1, i, recurse).exec();
			}
		}
	},

	play: function(){
		// Determine what to play
		var selfies = this;
		var childNo = this.childNo
		var note = songAPI.getNote(selfies.node.name, selfies.depth);
		note.play();
		console.log("Playing: child: " + childNo + " - " + selfies.node.name + " at depth: " + selfies.depth);
	},

	exec: function() {
		this.init();
		var node = this;
		setTimeout(function(){
			node.setChildren();
		}, DELAYBETWEENLAYERS)
	}

}

// new AudioGenerator(parsedHTML).run()
	var TREE = [];
	function parse(parseHTML){
		var thisLevel = [];
		_.forEach(parseHTML, function(node){
			thisLevel.push(node);
		})
		TREE[0] = thisLevel;
		_.forEach(parseHTML, function(node){
			if (!node.name) return;
			parseRec(node, 1);
		})
	}
	
	function parseRec(node, depth) {
	
		if (TREE) {
			if (typeof(TREE[depth]) === 'undefined'){
				TREE[depth] = [];
			}
			TREE[depth].push(node);
		}
		if (!node.children) return;
		_.forEach(node.children, function(child){
			if (!child.name) return;
			parseRec(child, depth+1);
		})
	}
	
	parse(parsedHTML)

	function drums(depth){
		var out = [];
		_.forEach(depth, function(node){
			switch(node.name){
				case 'div':
					out.push([BD, HH1])
					break;
				case 'script':
					out.push([SD])
					break;
				case 'a':
					out.push([SD])
					break;
				case 'p':
					out.push([HH2])
					break;
				case 'ul':
					out.push([CYM])
					break;
				default:
					out.push([HH1])
			}
		})
		return out
	}

	function getScale(depth){
		var scale = []
		var i = 0
		_.forEach(depth, function(node){
				console.log(node);
				switch(node.name) {
					case 'a':
						i++
						break
					case 'p':
						scale.push(i)
						i++
						break
					case 'div':
						i++
						break
					case 'ul':
						i++
						break
					case 'li':
						scale.push(i);
						i++
						break
					case 'span':
						scale.push(i);
						i++
						break
					case 'script':
						scale.push(i);
						i++
						break
					case 'nav':
						i++;
						break;
					default:
						scale.push(i);
						i++;
				}
		})
		return scale;
	}

	var scaleNotes = getScale(TREE[1])

	var penta =  [0, 2, 4, 7, 9, 12]; // pentatonic scale
	
	var unnormalizedScale = scaleNotes
	var scale = unnormalizedScale.collect(function(i) { return i.nearestInScale(penta, 12); });

	console.log(scale);
	var pat = drums(TREE[0])
	var P1 = pat.wrapExtend(128);
	
  var P2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	
  var drum = T("lowshelf", {freq:110, gain:8, mul:0.6}, BD, SD, HH1, HH2, CYM).play();
  var lead = T("saw", {freq:T("param")});
  var vcf  = T("MoogFF", {freq:2400, gain:6, mul:0.1}, lead);
  var env  = T("perc", {r:100});
  var arp  = T("OscGen", {wave:"sin(15)", env:env, mul:0.5});
	var bass = T("saw", {freq:100})

	/* Pretty soaring synth */
	var mml0, mml1;
	var env   = T("adsr", {d:3000, s:0, r:600});
	var synth = T("SynthDef", {mul:0.45, poly:8});

	synth.def = function(opts) {
		var op1 = T("sin", {freq:opts.freq*6, fb:0.25, mul:0.4});
		var op2 = T("sin", {freq:opts.freq, phase:op1, mul:opts.velocity/128});
		return env.clone().append(op2).on("ended", opts.doneAction).bang();
	};

	var master = synth;
	var mod    = T("sin", {freq:2, add:3200, mul:800, kr:1});
	master = T("eq", {params:{lf:[800, 0.5, -2], mf:[6400, 0.5, 4]}}, master);
	master = T("phaser", {freq:mod, Q:2, steps:4}, master);
	master = T("delay", {time:"BPM60 L16", fb:0.65, mix:0.25}, master)
	

	/* */
  T("delay", {time:"BPM128 L4", fb:0.65, mix:0.35}, 
    T("pan", {pos:0.2}, vcf), 
    T("pan", {pos:T("tri", {freq:"BPM64 L1", mul:0.8}).kr()}, arp)
  ).play();

	var tempo = 'BPM' + (60 + TREE[0].length)
	T("interval", {interval:tempo + " L16"}, function(count) {
			var i = count % P1.length;
			if (i === 0) {
				CYM.bang();
			}

			/*
			if (i % 3) {
				songAPI.getNote(TREE[1][i]).play()
			}
			*/
			
			

			P1[i].forEach(function(p) { p.bang(); });

			if (Math.random() < 0.015) {
				var j = (Math.random() * P1.length)|0;
				P1.wrapSwap(i, j);
				P2.wrapSwap(i, j);
			}

		
			var noteNum = scale.wrapAt(P2.wrapAt(count)) + 60 

			if (i % 2 === 0 || i % 3 === 0) {
				lead.freq.linTo(noteNum.midicps(), "10ms");
			}
		}).start();
});
});
