const Stew = require('../index.js');


function StewClear() {
	this.insides = (this.type=="pair") ? new Map() : new Set();
}


Stew.newF("clear", StewClear);
