const Soup = require('../index.js');


function SoupToLowerCase() {
	let args = Array.from(arguments);
	if (args[0] instanceof Array) args = args[0];
	
	var stuff = this.copy();
	
	if (stuff.type == "list") {
		if (args.length > 0) {
			args.forEach( (i) => {
				if (typeof stuff[i] == "string") stuff.set(i, stuff[i].toLowerCase());
			});
		}
		else stuff.forEach( (value, index) => {
			if (typeof value == "string") stuff.set(index, value.toLowerCase());
		});
	}
	else if (stuff.type == "pair") {
		if (args.length > 0) {
			args.forEach( (i) => {
				if (typeof stuff.values[i] == "string") stuff.set(i, stuff.values[i].toLowerCase());
				if (typeof stuff.keys[i] == "string") stuff.rename(i, stuff.keys[i].toLowerCase());
			});
		}
		else stuff.forEach( (key, value, index) => {
			if (typeof value == "string") stuff.set(index, value.toLowerCase());
			if (typeof key == "string") stuff.rename(index, key.toLowerCase());
		});
	}
	return stuff;
}


Soup.newF("toLowerCase", SoupLowerCase);
Soup.newF("lower", SoupLowerCase);
