const Noodle = require('../index.js');


function NoodleReplaceAll(entry, replaceWith) {
	let thing = this.copy();
        for (let i = 0; i < thing.content.length; i++) thing.content = thing.content.replace(entry, replaceWith);

		return new this.constructor(thing);
}


Noodle.newF("replaceAll", NoodleReplaceAll);
