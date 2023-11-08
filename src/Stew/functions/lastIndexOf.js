const Stew = require('../index.js');


function StewLastIndexOf(entry, exact=true) {
	let stuff = this.find(entry, exact);
	return stuff[stuff.length-1];
}


Stew.newF("lastIndexOf", StewLastIndexOf);
