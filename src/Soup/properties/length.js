const Soup = require('../index.js');


function SoupLength() {
	return this.keys.length;
}


Soup.newP("length", SoupLength);
Soup.newP("size", SoupLength);
