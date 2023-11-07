const Stew = require('../index.js');


function StewLast(offset=0) {
	let entry = this.entries[(this.length-1)-offset];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: this.length-1} : entry[1];
}


Stew.newF("last", StewLast);
Stew.newF("back", StewLast);
Stew.newF("end", StewLast);
