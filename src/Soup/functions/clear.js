const Soup = require('../index.js');


function SoupClear() {
	let copy = this.copy();
	copy.insides = (this.type=="pair") ? {} : [];
	return copy;
}


Soup.newF("clear", SoupClear);
