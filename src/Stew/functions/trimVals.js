const Stew = require('../index.js');


function StewTrimVals() {
	var copy = this.copy();

        if (copy.type == "list") copy = copy.trim();

        else if (copy.type == "pair") {
            copy = copy.map( (k, v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        return copy;
}


Stew.newF("trimVals", StewTrimVals);
