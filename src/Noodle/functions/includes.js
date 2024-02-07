const Noodle = require('../index.js');


function NoodleIncludes(/**/) {
	let args = Array.from(arguments);
		if (args.length == 1 && args[0] instanceof Array) args = args[0];

        return args.some( (v) => { return this.content.includes(v); });
}


Noodle.newF("includes", NoodleIncludes);
Noodle.newF("contains", NoodleIncludes);
Noodle.newF("has", NoodleIncludes);
