const Soup = require('../index.js');


function SoupEntries() {
	return Object.entries(this.insides);
}


Soup.newP("entries", SoupEntries);
