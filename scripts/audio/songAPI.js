function SongAPI() {
	this.notesPlayed = 0;
	var self = this;

	this.getNote = function(tag) {
		// Get note based on element
		var note = this.buildNote(tag)
		this.notesPlayed++;
		return note;
	};
	
	this.buildNote = function(tag) {
		var volume = Math.random();

		switch(tag) {
			case 'link':
				return new Note(notesMap['1'], volume)
				break
			case 'p':
				return new Note(notesMap['2'], volume)
				break
			case 'div':
				return new Note(notesMap['3'], volume)
				break
			case 'ul':
				return new Note(notesMap['4'], volume)
				break
			case 'li':
				return new Note(notesMap['5'], volume)
				break
			case 'span':
				return new Note(notesMap['6'], volume)
				break
			case 'script':
				return new Note(notesMap['7'], volume)
				break
			default:
				return new Note(notesMap['1'], volume)
		}
	}

	this.buildPluck = function(depth){
		// generate high volume (.75,1)
		var volume = Math.random() / 4 + 0.75;
		var out = [];
		_.forEach(depth, function(node){
			out.push(node.name);
		});
		return out;
	}

	this.buildDrums = function(depth, callback) {
		T("audio").load("//hackcu-win.github.io/Moosik/audio/drumkit.wav", function() {
			var BD  = this.slice(   0,  500).set({bang:false});
			var SD  = this.slice( 500, 1000).set({bang:false});
			var HH1 = this.slice(1000, 1500).set({bang:false, mul:0.2});
			var HH2 = this.slice(1500, 2000).set({bang:false, mul:0.2});
			var CYM = this.slice(2000).set({bang:false, mul:0.2});
			var drum = T("lowshelf", {freq:110, gain:8, mul:0.6}, BD, SD, HH1, HH2, CYM).play();
			var pattern = [];
			_.forEach(depth, function(node){
				switch(node.name){
					case 'div':
						pattern.push([BD, HH1])
						break;
					case 'script':
						pattern.push([SD])
						break;
					case 'a':
						pattern.push([SD])
						break;
					case 'p':
						pattern.push([HH2])
						break;
					case 'ul':
						pattern.push([CYM])
						break;
					default:
						pattern.push([HH1])
				}
			})
			callback(pattern)
		})
	}

	this.buildScale = function(depth){
		var scale = []
		var i = 0
		_.forEach(depth, function(node){
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
					case 'link':
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
		return this.normalizeScale(scale)
	}
	
	this.normalizeScale = function(scaleNotes) {
		return scaleNotes.collect(function(i) { return i.nearestInScale(PENTATONIC_SCALE, 12); });
	}

}

