const Noodle = require('../index.js');


function NoodlePadStart(length, string=null) {
	let stuff = this.copy();
		stuff.content = stuff.content.padStart(length, string);
		return stuff;
}


Noodle.newF("padStart", NoodlePadStart);
