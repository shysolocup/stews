const Soup = require('../index.js');


function SoupCopy() {
	return new this.constructor(this.pour());
}


Soup.newF("copy", SoupCopy);
Soup.newF("clone", SoupCopy);
