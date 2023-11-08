const Noodle = require('../index.js');


function NoodleCopy() {
	return new this.constructor(this);
}


Noodle.newF("copy", NoodleCopy);
Noodle.newF("clone", NoodleCopy);
