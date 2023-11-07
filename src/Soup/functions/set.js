const Soup = require('../index.js');


function SoupSet(entry, set_to=null) {
	if (typeof entry == "string") {
		if (this.type == "pair") {
			this.insides[entry] = set_to;
		}
		else if (this.type == "list") return this.insides[this.insides.indexOf(entry)] = set_to;
	}
	else if (typeof entry == "number") {
		if (this.type == "pair") {
			this.insides[this.keys[entry]] = set_to;
		}
		else if (this.type == "list") return this.insides[entry] = set_to;
	}
}


Soup.newF("set", SoupSet);
