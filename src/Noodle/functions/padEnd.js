const Noodle = require('../index.js');


function NoodlePadEnd(length, string=null) {
	let stuff = this.copy();
		stuff.content = stuff.content.padEnd(length, string);
		return stuff;
}


Noodle.newF("padEnd", NoodlePadEnd);
