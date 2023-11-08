const Noodle = require('../index.js');


function NoodleGet(index) {
	return this.content.split("")[index]
}


Noodle.newF("get", NoodleGet);
Noodle.newF("at", NoodleGet);
