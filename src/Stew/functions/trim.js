const Stew = require('../index.js');


function StewTrim() {
	var copy = this.copy();

        if (copy.type == "list") {
            copy = copy.map( (v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        else if (copy.type == "pair") {
            copy = copy.mapKey( (k, v) => { return (typeof k == "string") ? k.trim() : k; });
            copy = copy.map( (k, v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        return copy;
}


Stew.newF("trim", StewTrim);
