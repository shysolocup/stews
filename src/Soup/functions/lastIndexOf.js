const Soup = require('../index.js');


function SoupLastIndexOf(entry, exact=true) {
	let stuff = this.find(entry, exact);
	return stuff[stuff.length-1];
}


Soup.newF("lastIndexOf", SoupLastIndexOf);
