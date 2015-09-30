var INJECTED = false;
// Is this individual tab playing right now?
var tabIsPlaying = false;

// Check if globally playing - only inject if so
chrome.runtime.sendMessage({playing: "query"}, function(response) {
	if (response.playing){
		console.log('injecting moosik');
		injectMoosik();
		tabIsPlaying = true;
	}
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.data == "toggle" && request.playing === false ){
			console.log(request);
			// Currently playing, ensure it is disabled
			toggle();
			sendResponse({data: "toggled"});
		} else if (request.data == "toggle" && request.playing === true){
			// Not playing, only toggle if it is __
			if (INJECTED) toggle();
			else injectMoosik();
			sendResponse({data: "toggled"});
		}
  }
);

function injectMoosik() {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('moosik.min.js');
	s.onload = function() {
			this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
	INJECTED = true;
}

function toggle() {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('toggle.js'); 
	s.onload = function() {
			this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
	tabIsPlaying = !tabIsPlaying;
}
