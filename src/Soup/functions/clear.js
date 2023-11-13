const Soup = require('../index.js');


function SoupClear() {
	this.insides = (this.type=="pair") ? {} : [];
}


Soup.newF("clear", SoupClear);
