const Noodle = require('../index.js');


function NoodleLastIndexesOf(entry) {
	let index = this.content.lastIndexOf(entry);
		let length = entry.length;

		let stuff = [ index ];

		for (let i = 1; i < length; i++) {
			stuff.push(index + i);
		}

		return stuff;
}


Noodle.newF("lastIndexesOf", NoodleLastIndexesOf);
