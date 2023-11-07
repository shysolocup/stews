const Soup = require('../index.js');


function SoupChug(func) {
	if (this.type == "pair") {
		for (let i = 0; i < this.length; i++) {
			if (!func(this.keys[i], this.values[i], i)) return false;
		}
	}
	else if (this.type == "list") {
		for (let i = 0; i < this.length; i++) {
			if (!func(this.insides[i], i)) return false;
		}
	}

	return true;
}


Soup.newF("chug", SoupChug);
Soup.newF("every", SoupChug);
