const Stew = require('../index.js');


function StewFirst(offset=0) {
	let entry = this.entries[0+offset];
	return (this.type == "pair") ? {key: entry[0], value: entry[1], index: 0} : entry[1];
}


Stew.newF("first", StewFirst);
Stew.newF("front", StewFirst);
Stew.newF("start", StewFirst);
