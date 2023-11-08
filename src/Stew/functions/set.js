const Stew = require('../index.js');


function StewSet(entry, set_to=null) {
	if (typeof entry == "string") {
            if (this.type == "pair") {
                return this.insides.set(entry, set_to);
            }
            else if (this.type == "list") {
                let thing = Array.from(this.insides);
                thing[thing.indexOf(entry)] = set_to;
                return this.insides = new Set(thing);
            }
        }
        else if (typeof entry == "number") {
            if (this.type == "pair") {
                return this.insides.set(this.keys[entry], set_to);
            }
            else if (this.type == "list") {
                let thing = Array.from(this.insides);
                thing[entry] = set_to;
                return this.insides = new Set(thing);
            }
        }
}


Stew.newF("set", StewSet);
