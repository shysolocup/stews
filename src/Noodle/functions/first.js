const Noodle = require('../index.js');


function NoodleFirst(offset=0) {
	return this.get(0+offset);
}


Noodle.newF("first", NoodleFirst);
Noodle.newF("front", NoodleFirst);
Noodle.newF("start", NoodleFirst);
