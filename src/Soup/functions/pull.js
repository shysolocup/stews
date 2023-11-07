const Soup = require('../index.js');


function SoupPull(entry, value=null) {
	if (this.type == "pair") {
		let thing = this.entries;
		thing.unshift( [entry, value] );
		this.insides = Object.fromEntries(thing);
	}
	else if (this.type == "list") return this.insides.unshift(entry);
}


Soup.newF("pull", SoupPull);
Soup.newF("unshift", SoupPull);
Soup.newF("push_front", SoupPull);
