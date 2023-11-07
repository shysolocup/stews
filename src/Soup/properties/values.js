const Soup = require('../index.js');


function SoupValues() {
	return Object.values(this.insides);
}


Soup.newP("values", SoupValues);
