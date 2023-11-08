const Noodle = require('../index.js');


function NoodleLastIndexOf(entry) {
	return this.content.lastIndexOf(entry);
}


Noodle.newF("lastIndexOf", NoodleLastIndexOf);
