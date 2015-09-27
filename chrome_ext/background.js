// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
	console.log('Making magic music happen!');

	/*
  chrome.tabs.executeScript({
    code: '$(\'html\').append(\'<script src="//hackcu-win.github.io/Moosik/scripts/scripts.min.js"></script>\')'
  });
	*/
});
