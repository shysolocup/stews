const Soup = require('../index.js');


function SoupKeyOf(entry) {
	if (this.type == "pair") {
		if (typeof entry == "string" && this.hasValue(entry)) return this.keys[ this.values.indexOf(entry) ];
		else return this.keys[ (typeof entry == "string") ? this.indexOf(entry) : entry];
	}
	else if (this.type == "list") return this.insides[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
}


Soup.newF("keyOf", SoupKeyOf);
