"use strict";

var __startX__,
	__startY__;

document.addEventListener("dragstart", function (event) {
	__startX__ = event.pageX;
	__startY__ = event.pageY;
	event.dataTransfer.effectAllowed = "all";
	event.stopImmediatePropagation();
});

document.addEventListener("dragenter", function (event) {
	event.preventDefault();
	event.stopImmediatePropagation();
});

document.addEventListener("dragover", function (event) {
	event.dataTransfer.dropEffect = "copy";
	event.preventDefault();
	event.stopImmediatePropagation();
});

document.addEventListener("drop", function (event) {
	var target = event.dataTransfer.getData("Text"),
		direction;
		
	if (!target) return;
	
	if (event.pageY > __startY__) {
		direction = "bottom";
	} else {
		direction = "top";
	}
	
	if (event.pageX > __startX__) {
		direction += "Right"
	} else {
		direction += "Left";
	}
	
	console.log("Target: " + target);
	console.log("Direction: " + direction);
	chrome.runtime.connect({name: "dragToGo"}).postMessage({
		target: target,
		direction: direction
	});
	
	event.preventDefault();
	event.stopImmediatePropagation();
});
