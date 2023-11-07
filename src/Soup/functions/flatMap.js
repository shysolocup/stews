const Soup = require('../index.js');


function SoupFlatMap(func) {
	return Soup.from( (this.type == "list") ? this.insides.flatMap(func) : this.entries.flatMap(func));
}


Soup.newF("flatMap", SoupFlatMap);
