const Stew = require('../index.js');


function StewIncludesVal(/**/) {
	let args = Array.from(arguments);

        if (args.length == 1 && typeof args[0] != "object") {
            let value = args[0];
            return this.values.includes(value);
        }
        else {
            if (args[0] instanceof Array) args = args[0];
            for (let i = 0; i < args.length; i++) {
                if (this.values.includes(args[i])) return true;
            }
            return false;
        }
}


Stew.newF("includesVal", StewIncludesVal);
Stew.newF("containsVal", StewIncludesVal);
Stew.newF("hasVal", StewIncludesVal);
