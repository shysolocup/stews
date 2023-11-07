const Soup = require('../index.js');


function SoupFlat(depth=1) {
	return Soup.from( (this.type == "list") ? this.insides.flat(depth) : this.entries.flat(depth));
}


Soup.newF("flat", SoupFlat);
