const Stew = require('../index.js');


function StewGet(entry) {
	if (typeof entry == "string") {
            if (this.type == "pair") return this.insides.get(entry);
            else if (this.type == "list") return Array.from(this.insides)[this.indexOf(entry)];
        }
        else if (typeof entry == "number") {
            if (this.type == "pair") return this.insides.get(this.keys[entry]);
            else if (this.type == "list") return Array.from(this.insides)[entry];
        }
}


Stew.newF("get", StewGet);
Stew.newF("at", StewGet);
