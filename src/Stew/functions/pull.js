const Soup = require('../index.js');


function SoupPull(entry, value=null) {
	if (this.type == "pair") {
            let thing = this.entries;
            thing.unshift([entry, value]);
            this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing.unshift(entry);
            this.insides = new Set(thing);
        }
}


Soup.newF("pull", SoupPull);
Soup.newF("unshift", SoupPull);
Soup.newF("push_front", SoupPull);
