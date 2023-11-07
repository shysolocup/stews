const Soup = require('../index.js');


function SoupValueOf(entry) {
	if (this.type == "pair") return this.values[ (typeof entry == "string") ? this.indexOf(entry) : entry];
	else if (this.type == "list") return this.insides[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
}


Soup.newF("valueOf", SoupValueOf);
