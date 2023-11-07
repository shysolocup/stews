const Soup = require('../index.js');


function SoupForEach(func) {
	for (let i = 0; i < this.length; i++) {
		if (this.type == "pair") {
			func( this.keys[i], this.values[i], i );
		}
		else if (this.type == "list") {
			func( this.insides[i], i );
		}
	}
}


Soup.newF("forEach", SoupForEach);
