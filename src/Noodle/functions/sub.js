const Noodle = require('../index.js');


function NoodleSub(start, length) {
	let stuff = this.copy();
		stuff.content = stuff.content.substr(start, length);
		return stuff;
}


Noodle.newF("sub", NoodleSub);
Noodle.newF("substr", NoodleSub);
