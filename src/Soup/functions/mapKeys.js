const Soup = require('../index.js');


function SoupMapKeys(func) {
	if (this.type == "pair") {
		let thing = this.copy();

		this.forEach( (key, value, index) => {
			thing.rename(index, func(key, value, index));
		});
		
		return new Soup(Object.fromEntries(thing));
	}
	else if (this.type == "list") {
		let thing = Array.from(this.copy().insides);
		this.forEach( (value, index) => {
			thing[index] = func(value, index);
		});

		return new Soup(thing);
	}
}


Soup.newF("mapKey", SoupMapKeys);
Soup.newF("mapKeys", SoupMapKeys);
