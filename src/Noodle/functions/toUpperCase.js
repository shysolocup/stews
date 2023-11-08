const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleToUpperCase(/**/) {
	let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		let stuff = this.copy();

		if (args.length > 0) {
			args.forEach( (i) => {
				let thing = Soup.from(stuff.content);
				thing[i] = thing[i].toUpperCase();
				stuff.content = thing.join("");
				
			});
		}
		else {
			stuff.content = stuff.content.toUpperCase();
		}
		
		return new this.constructor(stuff);
}


Noodle.newF("toUpperCase", NoodleToUpperCase);
Noodle.newF("upper", NoodleToUpperCase);
