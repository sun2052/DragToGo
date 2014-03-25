"use strict";

window.addEventListener("DOMContentLoaded", function (event) {

	// Intializes New Tab Status
	var status = localStorage["tabStatus"] || "BACK";
	document.querySelector("[value='" + status + "']").checked = true;

	// Intializes Search Engines
	Array.prototype.slice.call(document.querySelectorAll("select")).forEach(function (select) {
		var html = "";
		for (var name in Engine) {
			if (Engine.hasOwnProperty(name)) {
				html += "<option value=\"%s\">%s</option>".replace(/%s/g, name);
			}
		}
		select.innerHTML = html;
		select.addEventListener("change", function (event) {
			select.nextElementSibling.value = Engine[select.value];
		});
	});

	// Loads values for each direction
	var defaults = {
		"topLeft": "爱词霸",
		"topRight": "有道词典",
		"bottomLeft": "Baidu",
		"bottomRight": "Google"
	};
	for (var name in defaults) {
		if (defaults.hasOwnProperty(name)) {
			var target = document.querySelector("#" + name);
			target.value = localStorage[name] || defaults[name];
			target.dispatchEvent(new Event("change"));
		}
	}

	// Saves options
	document.querySelector("#btnSave").addEventListener("click", function (event) {
		localStorage["tabStatus"] = document.querySelector("[name='tabStatus']:checked").value;
		Array.prototype.slice.call(document.querySelectorAll("select")).forEach(function (element) {
			localStorage[element.id] = element.value;
		});
	});

	// Reset options
	document.querySelector("#btnReset").addEventListener("click", function (event) {
		if (window.confirm("Are you sure you want to reset options?")) {
			// Reset options
			document.querySelector("[value='BACK']").checked = true;
			for (var name in defaults) {
				if (defaults.hasOwnProperty(name)) {
					var target = document.querySelector("#" + name);
					target.value = defaults[name];
					target.dispatchEvent(new Event("change"));
				}
			}
			
			// Saves options
			document.querySelector("#btnSave").dispatchEvent(new Event("click"));
		}
	});
});

