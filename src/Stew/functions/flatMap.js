const Stew = require('../index.js');


function StewFlatMap(func) {
	return Stew.from( (this.type == "list") ? Array.from(this.insides).flatMap(func) : this.entries.flatMap(func));
}


Stew.newF("flatMap", StewFlatMap);
