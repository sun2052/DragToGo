"use strict";

// Adds event listener
chrome.runtime.onConnect.addListener(function (port) {
	if (port.name !== "dragToGo") return;

	// Opens a new tab
	port.onMessage.addListener(function (msg) {
		chrome.tabs.create({
			url: getTargetLink(msg),
			active: getTabStatus(msg)
		});
	});
});

// Gets the target link
function getTargetLink(msg) {
	var url;
	if (/^(http|https|ftp)\:\/\//.test(msg.target)) {
		url = msg.target;
	} else {
		switch (msg.direction) {
			case "topLeft":
				url = Engine[localStorage[msg.direction] || "爱词霸"];
				break;
			case "topRight":
				url = Engine[localStorage[msg.direction] || "有道词典"];
				break;
			case "bottomLeft":
				url = Engine[localStorage[msg.direction] || "Baidu"];
				break;
			case "bottomRight":
				url = Engine[localStorage[msg.direction] || "Google"];
				break;
		}
		url = url.replace(/%s/g, encodeURIComponent(msg.target));
	}
	return url;
}

// Gets the Tab Status
function getTabStatus(msg) {
	var status = false;
	if (localStorage["tabStatus"]) {
		if (!/^(http|https|ftp)\:\/\//.test(msg.target)) {
			switch (localStorage["tabStatus"]) {
				case "FORE":
					status = true;
					break;
				case "BACK":
					status = false;
					break;
				case "AUTO":
					if (/top/.test(msg.direction)) {
						status = true;
					}
					break;
			}
		}
	}
	return status;
}