const Noodle = require('../index.js');


function NoodleToString() {
	return this.content;
}


Noodle.newF("toString", NoodleToString);
