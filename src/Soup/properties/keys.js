const Soup = require('../index.js');


function SoupKeys() {
	return Object.keys(this.insides);
}


Soup.newP("keys", SoupKeys);
