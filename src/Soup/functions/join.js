const Soup = require('../index.js');


function SoupJoin(joiner=",") {
	return (this.type == "list") ? this.insides.join(joiner) : this.keys.join(joiner);
}


Soup.newF("join", SoupJoin);
Soup.newF("joinKeys", SoupJoin);
