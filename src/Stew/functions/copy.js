const Stew = require('../index.js');


function StewCopy() {
	return new this.constructor(this.pour());
}


Stew.newF("copy", StewCopy);
Stew.newF("clone", StewCopy);
