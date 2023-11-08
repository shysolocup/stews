const Noodle = require('../index.js');


function NoodleReplace(entry, replaceWith) {
	let thing = this.copy();
		thing.content = thing.content.replace(entry, replaceWith);
        return new this.constructor(thing);
}


Noodle.newF("replace", NoodleReplace);
