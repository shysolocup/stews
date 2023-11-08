const Stew = require('../index.js');


function StewValueOf(entry) {
	if (this.type == "pair") return this.values[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return Array.from(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
}


Stew.newF("valueOf", StewValueOf);
