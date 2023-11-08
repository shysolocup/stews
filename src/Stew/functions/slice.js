const Stew = require('../index.js');


function StewSlice(start, end) {
	if (this.type == "pair") {
            return new Stew( Object.fromEntries( this.entries.slice(start, end)) );
        }
        else if (this.type == "list") {
            return new Stew(Array.from(this.insides).slice(start, end));
        }
}


Stew.newF("slice", StewSlice);
