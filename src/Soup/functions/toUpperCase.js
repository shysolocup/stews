const Soup = require('../index.js');


function SoupToUpperCase(...args) {
	if (args[0] instanceof Array) args = args[0];
	
	var stuff = this.copy();
	
	if (stuff.type == "list") {
		if (args.length > 0) {
			args.forEach( (i) => {
				if (typeof stuff[i] == "string") stuff.set(i, stuff[i].toUpperCase());
			});
		}
		else stuff.forEach( (value, index) => {
			if (typeof value == "string") stuff.set(index, value.toUpperCase());
		});
	}
	else if (stuff.type == "pair") {
		if (args.length > 0) {
			args.forEach( (i) => {
				if (typeof stuff.values[i] == "string") stuff.set(i, stuff.values[i].toUpperCase());
				if (typeof stuff.keys[i] == "string") stuff.rename(i, stuff.keys[i].toUpperCase());
			});
		}
		else stuff.forEach( (key, value, index) => {
			if (typeof value == "string") stuff.set(index, value.toUpperCase());
			if (typeof key == "string") stuff.rename(index, key.toUpperCase());
		});
	}
	return stuff;
}


Soup.newF("upper", SoupToUpperCase);
Soup.newF("toUpperCase", SoupToUpperCase);
