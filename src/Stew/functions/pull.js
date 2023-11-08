const Stew = require('../index.js');


function StewPull(entry, value=null) {
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


Stew.newF("pull", StewPull);
Stew.newF("unshift", StewPull);
Stew.newF("push_front", StewPull);
