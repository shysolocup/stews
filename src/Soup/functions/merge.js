const Soup = require('../index.js');


function SoupMerge(/**/) {
	var args = arguments;
	var stuffs = this.copy();

	for (obj of args) {
		var obj = Soup.from(obj);

		if (obj.type == "list") {
			obj.forEach( (value, index) => {
				(this.type == "pair") ? stuffs.push(`${index}`, value) : stuffs.push(value);
			});
		}

		if (obj.type == "pair") {
			obj.forEach( (key, value) => {
				(this.type == "pair") ? stuffs.push(key, value) : stuffs.push( [key, value] );
			});
		}
	};

	return stuffs;
}


Soup.newF("merge", SoupMerge);
Soup.newF("concat", SoupMerge);
