const Stew = require('../index.js');


function StewEntryOf(entry) {
	return this.entries[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
}


Stew.newF("entryOf", StewEntryOf);
