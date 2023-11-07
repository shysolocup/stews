const Soup = require('../index.js');


function SoupMap(func) {
	if (this.type == "pair") {
		let thing = this.entries;

		this.forEach( (key, value, index) => {
			thing[index][1] = func(key, value, index);
		});
		
		return new Soup(Object.fromEntries(thing));
	}
	else if (this.type == "list") {
		let thing = this.copy().insides;

		this.forEach( (value, index) => {
			thing[index] = func(value, index);
		});

		return new Soup(thing);
	}
}


Soup.newF("map", SoupMap);
