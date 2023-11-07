const Soup = require('../index.js');


function SoupTrimKeys() {
	var copy = this.copy();

	if (copy.type == "list") copy = copy.trim();

	else if (copy.type == "pair") {
		copy = copy.mapKey( (k, v) => { return (typeof k == "string") ? k.trim() : k; });
	}

	return copy;
}


Soup.newF("trimKeys", SoupTrimKeys);
