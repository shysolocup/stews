const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleToLowerCase(/**/) {
	let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		let stuff = this.copy();

		if (args.length > 0) {
			args.forEach( (i) => {
				let thing = Soup.from(stuff.content);
				thing[i] = thing[i].toLowerCase();
				stuff.content = thing.join("");
				
			});
		}
		else {
			stuff.content = stuff.content.toLowerCase();
		}
		
		return new this.constructor(stuff);
}


Noodle.newF("toLowerCase", NoodleToLowerCase);
Noodle.newF("lower", NoodleToLowerCase);
