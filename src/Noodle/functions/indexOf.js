const Noodle = require('../index.js');


function NoodleIndexOf(entry) {
	return this.content.indexOf(entry);
}


Noodle.newF("indexOf", NoodleIndexOf);
