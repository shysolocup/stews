const Soup = require('../index.js');


function SoupLast(offset=0) {
	let entry = this.entries[(this.length-1)-offset];
	return (this.type == "pair") ? {key: entry[0], value: entry[1], index: this.length-1} : entry[1];
}


Soup.newF("last", SoupLast);
Soup.newF("back", SoupLast);
Soup.newF("end", SoupLast);
