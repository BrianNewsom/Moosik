// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var isPlayingGlobally = false;
var currentTabId = 0;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!

	var message = {data: "toggle", isPlayingGlobally: isPlayingGlobally, tabChange: false};
	chrome.tabs.sendMessage(tab.id, message, function(response){
		// Now wait to see if it was toggled
		if (response.toggled) {
			isPlayingGlobally = !isPlayingGlobally;
		}
	});

});

// Receive playing query
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.playing == "query")
      sendResponse({playing: isPlayingGlobally});
  });

// When we change tabs, stop currently playing music
chrome.tabs.onActivated.addListener(function(activeInfo){
	// Stop music in tab we just changed from
	if (isPlayingGlobally && currentTabId != activeInfo.tabId){
		chrome.tabs.sendMessage(currentTabId, {data: "tabChange"})
	}
	// Set new current tab
	currentTabId = activeInfo.tabId

	// Now start playing on the new tab if it already existed
	if (isPlayingGlobally){
		chrome.tabs.sendMessage(activeInfo.tabId, {data: "tabChange"});
	}
})
