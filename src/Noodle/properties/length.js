const Noodle = require('../index.js');


function NoodleLength() {
	return this.content.split("").length;
}


Noodle.newP("length", NoodleLength);
Noodle.newP("size", NoodleLength);
