const Stew = require('../index.js');


function StewEndsWith(/**/) {
	let args = Array.from(arguments);
	if (args[0] instanceof Array) args = args[0];
	let stuff = this.join("");

	for (let i = 0; i < args.length; i++) {
		if (stuff.endsWith(args[i])) return true;
	}
	return false;
}


Stew.newF("endsWith", StewEndsWith);
