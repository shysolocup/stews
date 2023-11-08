const Noodle = require('../index.js');


function NoodleSubstring(start, end) {
	let stuff = this.copy();
		stuff.content = stuff.content.substring(start, end);
		return stuff;
}


Noodle.newF("substring", NoodleSubstring);
