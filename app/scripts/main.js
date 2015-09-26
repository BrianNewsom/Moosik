'use strict';

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


function Note(freq, volume) {
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
		switch(tag) {
			case 'a':
				return new Note(notesMap['E'], volume);
				break
			case 'p':
				return new Note(notesMap['D'], volume);
				break
			case 'div':
				return new Note(notesMap['G'], volume);
				break
			case 'ul':
				return new Note(notesMap['G'], volume);
				break
			case 'li':
				return new Note(notesMap['G'], volume);
				break
			case 'span':
				return new Note(notesMap['G'], volume);
				break
			case 'script':
				return new Note(notesMap['G'], volume);
				break
			default:
				return new Note(notesMap['A'], volume);
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
};

AudioGenerator.prototype = {
	run: function() {
		for (var i = 0 ; i < this.html.length ; i++) {
			// New nodes at depth 0
			if (this.html[i] && this.html[i].name)
				var n = new AudioNode(this.html[i], 0, i).exec()
		}
	}
}

function AudioNode(node, depth, childNo) {
	this.children = [];
	this.node = node;
	this.depth = depth;
	// Child number
	this.childNo = childNo;
}

// in ms
var DELAYBETWEENLAYERS = 4000;
var DELAYBETWEENCHILDREN = 250;

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
		if (this.children.length && this.children[0]){
			for (var i = 0 ; i < this.children.length ; i++){
				var child = this.children[i]
				new AudioNode(child, this.depth+1, i).exec();
			}
		}
	},
	play: function(){
		// Determine what to play
		var selfies = this;
		var childNo = this.childNo
		setTimeout(function() {
			var note = songAPI.getNote(selfies.node.name, selfies.depth);
			note.play();
			console.log("Playing: child: " + childNo + " - " + selfies.node.name + " at depth: " + selfies.depth);
		}, childNo * DELAYBETWEENCHILDREN)
	},
	exec: function() {
		this.init();
		this.play();
		var node = this;
		setTimeout(function(){
			node.setChildren();
		}, DELAYBETWEENLAYERS)
	}
}

// Actually run everything
new AudioGenerator(parsedHTML).run()
