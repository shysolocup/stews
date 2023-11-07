const Stew = require('../index.js');


function StewLength() {
	return this.keys.length;
}


Stew.newP("length", StewLength);
Stew.newP("size", StewLength);
