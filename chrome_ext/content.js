// Have we injected the moosik script yet?
var moosikIsInjected= false;
// Is this individual tab playing right now?
var tabIsPlaying = false;

// Check if globally playing - only inject if so
chrome.runtime.sendMessage({playing: "query"}, function(response) {
	if (response.playing){
		console.log('injecting moosik');
		injectMoosik();
	}
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.data == "toggle"){
			if (request.playing){
				console.log(request);
				// Currently playing, ensure it is disabled
				toggle();
				sendResponse({toggled: true});
			} else if (!request.playing){
				// Not playing, toggle if it is not a tab change
				console.log(request);
				if (moosikIsInjected) toggle();
				else injectMoosik();
				sendResponse({toggled: true});
			}
		} else if (request.data == "tabChange"){
			// We should only be here if music was playing, so we want to disable it.
			console.log(request);
			toggle();
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
	moosikIsInjected = true;
	tabIsPlaying = true;
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
