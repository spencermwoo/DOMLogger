chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		console.log(msg.log);
		console.log('---background.js---');
	})
})