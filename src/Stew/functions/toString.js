const Stew = require('../index.js');


function StewToString() {
	return Array.from(this.insides).toString();
}


Stew.newF("toString", StewToString);
