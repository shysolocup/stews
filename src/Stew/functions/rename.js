const Stew = require('../index.js');


function StewRename(entry, name) {
	if (this.type == "pair") {
            let thing = this.entries;
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry][0] = name;
            return this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry] = name;
            return this.insides = new Set(thing);
        }
}


Stew.newF("rename", StewRename);
