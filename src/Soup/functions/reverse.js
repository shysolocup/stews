const Soup = require('../index.js');


function SoupReverse() {
  let copy = this.copy();
	if (copy.type == "pair") {
		copy.insides = Object.fromEntries( copy.entries.reverse() );
		return copy;
	}
	else if (copy.type == "list") {
		copy.insides = copy.insides.reverse();
		return copy;
	}
}


Soup.newF("reverse", SoupReverse);
Soup.newF("flip", SoupReverse);
