const Noodle = require('../index.js');


function NoodleSubstr(start, length) {
	let stuff = this.copy();
		stuff.content = stuff.content.substr(start, length);
		return stuff;
}


Noodle.newF("substr", NoodleSubstr);
