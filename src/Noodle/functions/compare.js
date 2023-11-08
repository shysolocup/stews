const Noodle = require('../index.js');


function NoodleCompare(x) {
	return this.content.localeCompare(x);
}


Noodle.newF("compare", NoodleCompare);
Noodle.newF("localeCompare", NoodleCompare);
