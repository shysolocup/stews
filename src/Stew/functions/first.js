const Stew = require('../index.js');


function StewFirst(offset=0) {
	let entry = this.entries[0+offset];
	return entry[1];
}


Stew.newF("first", StewFirst);
Stew.newF("front", StewFirst);
Stew.newF("start", StewFirst);
