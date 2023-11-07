const Stew = require('../index.js');


function StewFlat(depth=1) {
	return Stew.from( (this.type == "list") ? Array.from(this.insides).flat(depth) : this.entries.flat(depth));
}


Stew.newF("flat", StewFlat);
