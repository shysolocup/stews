const Soup = require('../index.js');


function SoupSlice(start, end) {
	if (this.type == "pair") {
		return new Soup( Object.fromEntries( this.entries.slice(start, end)) );
	}
	else if (this.type == "list") {
		return new Soup(this.insides.slice(start, end));
	}
}


Soup.newF("slice", SoupSlice);
