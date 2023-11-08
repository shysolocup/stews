const Noodle = require('../index.js');


function NoodleIndexesOf(entry) {
	let index = this.content.indexOf(entry);
		let length = entry.length;

		let stuff = [ index ];

		for (let i = 1; i < length; i++) {
			stuff.push(index + i);
		}

		return stuff;
}


Noodle.newF("indexesOf", NoodleIndexesOf);
