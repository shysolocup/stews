const Stew = require('../index.js');


function StewIncludes(/**/) {
	let args = Array.from(arguments);

        if (args.length == 1 && typeof args[0] != "object") {
            var entry = args[0];

            if (this.type == "pair") return this.keys.includes(entry);
            else if (this.type == "list") return Array.from(this.insides).includes(entry);
        }
        else {
            if (args[0] instanceof Array) args = args[0];
            for (let i = 0; i < args.length; i++) {
			    if (this.includes(args[i])) return true;
		    }
		    return false;
        }
}


Stew.newF("includes", StewIncludes);
Stew.newF("contains", StewIncludes);
Stew.newF("has", StewIncludes);
