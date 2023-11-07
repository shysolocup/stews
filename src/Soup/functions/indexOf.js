const Soup = require('../index.js');


function SoupIndexOf(entry, exact=true) {
	let stuff = this.find(entry, exact);
	return stuff[0];
}


Soup.newF("indexOf", SoupIndexOf);
