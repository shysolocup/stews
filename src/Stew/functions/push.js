const Stew = require('../index.js');


function StewPush(entry, value=null) {
	if (this.type == "pair") {
            let thing = this.entries;
            thing.push([entry, value]);
            this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing.push(entry);
            this.insides = new Set(thing);
        }
}


Stew.newF("push", StewPush);
Stew.newF("push_back", StewPush);
