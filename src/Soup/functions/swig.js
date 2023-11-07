const Soup = require('../index.js');


function SoupSwig(func) {
	if (this.type == "pair") {
		for (let i = 0; i < this.length; i++) {
			if (func(this.keys[i], this.values[i], i)) return true;
		}
	}
	else if (this.type == "list") {
		for (let i = 0; i < this.length; i++) {
			if (func(this.insides[i], i)) return true;
		}
	}

	return false;
}


Soup.newF("swig", SoupSwig);
Soup.newF("some", SoupSwig);
