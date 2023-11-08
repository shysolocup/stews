const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleFilter(func) {
	let stuff = Soup.from(this.copy());
		stuff = stuff.filter(func);
		return new this.constructor(stuff.join(""));
}


Noodle.newF("filter", NoodleFilter);
