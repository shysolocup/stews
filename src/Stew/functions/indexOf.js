const Stew = require('../index.js');


function StewIndexOf(entry, exact=true) {
	let stuff = this.find(entry, exact);
	return stuff[0];
}


Stew.newF("indexOf", StewIndexOf);
