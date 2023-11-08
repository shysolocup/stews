const Noodle = require('../index.js');


function NoodleSlice(start, end) {
	let stuff = this.copy();
		stuff.content = stuff.content.slice(start, end);
		return stuff;
}


Noodle.newF("slice", NoodleSlice);
