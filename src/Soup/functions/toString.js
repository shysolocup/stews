const Soup = require('../index.js');


function SoupToString() {
	return (this.type == "pair") ? this.entries.toString() : this.insides.toString();
}


Soup.newF("toString", SoupToString);
