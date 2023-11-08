const Stew = require('../index.js');


function StewTrimKeys() {
	var copy = this.copy();

        if (copy.type == "list") copy = copy.trim();

        else if (copy.type == "pair") {
            copy = copy.mapKey( (k, v) => { return (typeof k == "string") ? k.trim() : k; });
        }

        return copy;
}


Stew.newF("trimKeys", StewTrimKeys);
