const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleSplit(/**/) {
	var args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];

		let stuff = new Soup([this.content]);
		stuff = stuff.split(args);

		return stuff;
}


Noodle.newF("split", NoodleSplit);
