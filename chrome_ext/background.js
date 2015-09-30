// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var PLAYING = true;
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
	console.log('Making music happen!');
	PLAYING = !PLAYING;

	var message = {data: "toggle", playing: PLAYING};
	chrome.tabs.sendMessage(tab.id, message);
	/*
	chrome.tabs.query({}, function(tabs) {
			var message = {data: "toggle", playing: PLAYING};
			for (var i=0; i < tabs.length; ++i) {
					chrome.tabs.sendMessage(tabs[i].id, message);
			}
	});
	*/

});

// Receive playing query
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.playing == "query")
      sendResponse({playing: PLAYING});
  });
