var join_strings = function(){
	string = arguments[0] + " |";
	for ( var i = 1 ; i < arguments.length ; i++ ){
		string += " : " + arguments[i];
	}

	return string;
}

var log = function(msg, func) {
	log_string = join_strings(document.origin, func, msg);

	console.log(log_string);
	window.postMessage(log_string);
	console.log("------");
}

var dump_object = function(obj) {
	console.log(obj);

	dump_string = "";
	if(obj instanceof HTMLObjectElement){
		dump += "data : " + obj.data + "\n";
	}
	if(obj instanceof HTMLDivElement){
		dump += "innerHTML : " + obj.innerHTML + "\n";
	}
	if(obj instanceof Window){
		dump += "location : " + obj.location + "\n";
	}
	if(obj instanceof HTMLIFrameElement){
		dump += "src : " + obj.src + "\n";
		console.log(obj.src);
		if(obj.contentDocument){
			dump += "contentDocument.innerHTML : " + obj.contentDocument.innerHTML + "\n";
		}
	}

	return dump;
}

url = "https://www.youtube.com";

apply_handle = {
	apply: function(target, thisArg, args){
		if(args[0] != "debugger" && (document.origin != url)){
			msg = args.join(", ") + "\n";
			msg += dump_object(args[0]);

			log(msg, target);
			r = target.apply(thisArg, args);
			return r;
		}
	}	
}

log("DOMLogger." + document.origin, "start");


window.open = new Proxy(window.open, apply_handle);
document.createElement = new Proxy(document.createElement, apply_handle);

Element.prototype.appendChild = new Proxy(Element.prototype.appendChild, apply_handle);

window.setTimeout = new Proxy(window.setTimeout, apply_handle);

// Element.prototype.appendChild = new Proxy(Element.prototype.appendChild, apply_handle);
// Element.prototype.appendChild = new Proxy(Element.prototype.appendChild, apply_handle);
// Element.prototype.appendChild = new Proxy(Element.prototype.appendChild, apply_handle);