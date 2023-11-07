const Soup = require('../index.js');


function SoupIndexOfVal(entry) {
	if (this.type == "pair") return this.values.indexOf(entry);
	else if (this.type == "list") return this.insides.indexOf(entry);
}


Soup.newF("indexOfVal", SoupIndexOfVal);
