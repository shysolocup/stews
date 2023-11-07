const Soup = require('../index.js');


function SoupPush(entry, value=null) {
	if (this.type == "pair") {
		this.insides[entry] = value;
	}
	else if (this.type == "list") return this.insides.push(entry);
}


Soup.newF("push", SoupPush);
Soup.newF("push_back", SoupPush);
