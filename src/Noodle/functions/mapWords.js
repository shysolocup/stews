const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleMapWords(func) {
	let stuff = Soup.from(this.copy(), " ");
		stuff = stuff.map(func);
		return new this.constructor(stuff.join(" "));
}


Noodle.newF("mapWords", NoodleMapWords);
