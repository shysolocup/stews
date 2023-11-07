const Soup = require('../index.js');


function SoupEntryOf(entry) {
	return this.entries[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
}


Soup.newF("entryOf", SoupEntryOf);
