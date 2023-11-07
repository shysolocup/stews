const Stew = require('../index.js');


function StewKeyOf(entry) {
	if (this.type == "pair") {
            if (typeof entry == "string" && this.hasValue(entry)) return this.keys[this.values.indexOf(entry)];
            else return this.keys[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        }
        else if (this.type == "list") return Array.from(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
}


Stew.newF("keyOf", StewKeyOf);
