const Soup = require('../index.js');


function SoupStringify(replacer=null, indent=null) {
	if (this.type == "list") {
		if (indent) {
			let thing = JSON.stringify({ insides: this.insides }, replacer, indent);
			thing = thing.split('"insides": ');
			thing.shift();
			thing = thing.join("").split("");
			thing.pop();

			let start = thing.slice(0, thing.length-6);
			let end = thing.slice(thing.length-2, thing.length-1);
			start.push(end.join(""));

			thing = start;
			return thing.join("");
		} else return `[${this.toString()}]`;
	}
	else return JSON.stringify(this.insides, replacer, indent);
}


Soup.newF("stringify", SoupStringify);
