var port = chrome.runtime.connect();

window.addEventListener("script", function(event) {
	port.postMessage({
		log : event.data
	});
}, false);

var s = document.createElement('script');
s.src = chrome.extension.getURL('hook.js');
document.documentElement.appendChild(s);