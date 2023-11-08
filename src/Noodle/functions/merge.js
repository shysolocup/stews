const Noodle = require('../index.js');


function NoodleMerge(joiner=",", /**/) {
  var args = Array.from(arguments);
		args.shift();

		let stuff = this.copy();
		
        if (args[0] instanceof Array) args = args[0];

		for (let obj of args) {
			let thing = new Noodle(obj);

			stuff.content = stuff.content.concat(joiner, thing.content);
		}

		return stuff;
}


Noodle.newF("merge", NoodleMerge);
Noodle.newF("concat", NoodleMerge
