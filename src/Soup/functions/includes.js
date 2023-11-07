const Soup = require('../index.js');


function SoupIncludes(/**/) {
	let args = Array.from(arguments);

	if (args.length == 1 && typeof args[0] != "object") {
		var entry = args[0];

		if (this.type == "pair") return this.keys.includes(entry);
		else if (this.type == "list") return this.insides.includes(entry);
	}
	else {
		if (args[0] instanceof Array) args = args[0];
		for (let i = 0; i < args.length; i++) {
			if (this.includes(args[i])) return true;
		}
		return false;
	}
}


Soup.newF("includes", SoupIncludes);
Soup.newF("contains", SoupIncludes);
Soup.newF("has", SoupIncludes);
