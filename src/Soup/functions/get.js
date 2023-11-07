const Soup = require('../index.js');


function SoupGet(entry) {
	if (typeof entry == "string") {
		if (this.type == "pair") return this.insides[entry];
		else if (this.type == "list") return this.insides[this.insides.indexOf(entry)];
	}
	else if (typeof entry == "number") {
		if (this.type == "pair") return this.insides[this.keys[entry]];
		else if (this.type == "list") return this.insides[entry];
	}
}


Soup.newF("get", SoupGet);
Soup.newF("at", SoupGet);
