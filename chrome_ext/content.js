var s = document.createElement('script');
s.src = chrome.extension.getURL('moosik.min.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

console.log('makin money');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.data == "toggle"){
			toggle();
      sendResponse({data: "toggled"});
		}
  }
);

function toggle() {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('toggle.js'); 
	s.onload = function() {
			this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(s);
}
