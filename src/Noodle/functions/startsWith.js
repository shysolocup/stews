const Noodle = require('../index.js');


function NoodleStartsWith(/**/) {
	let args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.content;

        for (let i = 0; i < args.length; i++) {
            if (stuff.startsWith(args[i])) return true;
        }
        return false;
}


Noodle.newF("startsWith", NoodleStartsWith);
