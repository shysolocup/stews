const Soup = require('../index.js');


function SoupRename(entry, name) {
	if (this.type == "pair") {
		let thing = this.entries;
		thing[(typeof entry == "string") ? this.indexOf(entry) : entry][0] = name;
		return this.insides = Object.fromEntries(thing);
	}
	else if (this.type == "list") {
		return this.insides[(typeof entry == "string") ? this.indexOf(entry) : entry] = name;
	}
}


Soup.newF("rename", SoupRename);
