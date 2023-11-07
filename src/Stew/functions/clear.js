const Stew = require('../index.js');


function StewClear() {
	let copy = this.copy();
	copy.insides = (this.type=="pair") ? new Map() : new Set();
	return copy;
}


Stew.newF("clear", StewClear);
