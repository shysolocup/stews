const Soup = require('../index.js');


function SoupScoop(/**/) {
	var args = Array.from(arguments);
	var stuff = Soup.from(this);

	if (args[0] instanceof Array) args = args[0];

	if (this.type == "list") {
		this.insides = this.filter( (value, index) => {
			if (args[0] instanceof Function) return !args[0](value, index);
			return !args.includes(index) && !args.includes(value);
		}).pour();
		return stuff;
	}

	else if (this.type == "pair") {
		this.insides = this.filter( (key, value, index) => {
			if (args[0] instanceof Function) return !args[0](key, value, index);
			return !args.includes(index) && !args.includes(key);
		}).pour();
		return stuff;
	}
}


Soup.newF("scoop", SoupScoop);
