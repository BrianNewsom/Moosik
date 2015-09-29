// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
	console.log('Making music happen!');

  chrome.tabs.sendMessage(tab.id, {data: "toggle"}, function(response) {
		console.log('sent toggle');
		console.log(response.data);
  });
});
