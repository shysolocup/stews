const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleSwig(func) {
	let stuff = Soup.from(this.copy(), "");
		return stuff.swig(func);
}


Noodle.newF("swig", NoodleSwig);
Noodle.newF("some", NoodleSwig);
