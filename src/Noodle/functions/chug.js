const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleChug(func) {
	let stuff = Soup.from(this.copy(), "");
		return stuff.chug(func);
}


Noodle.newF("chug", NoodleChug);
Noodle.newF("every", NoodleChug);
