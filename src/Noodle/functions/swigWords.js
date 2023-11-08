const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleSwigWords(func) {
	let stuff = Soup.from(this.copy(), " ");
		return stuff.swig(func);
}


Noodle.newF("swigWords", NoodleSwigWords);
Noodle.newF("someWords", NoodleSwigWords);
