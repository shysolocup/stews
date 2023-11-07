const Soup = require('../index.js');


function SoupIncludesVal(/**/) {
	let args = Array.from(arguments);

	if (args.length == 1 && typeof args[0] != "object") {
		let value = args[0];
		return this.values.includes(value);
	}
	else {
		if (args[0] instanceof Array) args = args[0];
		for (let i = 0; i < args.length; i++) {
			if (this.values.includes(args[i])) return true;
		}
		return false;
	}
}


Soup.newF("includesVal", SoupIncludesVal);
Soup.newF("containsVal", SoupIncludesVal);
Soup.newF("hasVal", SoupIncludesVal);
