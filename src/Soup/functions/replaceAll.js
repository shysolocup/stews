const Soup = require('../index.js');


function SoupReplaceAll(entry, replaceWith) {
	let thing = this.copy();
	if (thing.type == "list") {
		thing.forEach( (value, index) => {
			var stuff = value; while (stuff.includes(entry)) stuff = stuff.replace(entry, replaceWith);

			if (value.includes(entry)) thing.set(index, stuff );
		});
	}
	else if (thing.type == "pair") {
		thing.forEach( (key, value, index) => {
			var stuff = key; while (stuff.includes(entry)) stuff = stuff.replace(entry, replaceWith);

			if (key.includes(entry)) thing.rename(index, stuff);
		});
	}
	
	return thing;
}


Soup.newF("replaceAll", SoupReplaceAll);
