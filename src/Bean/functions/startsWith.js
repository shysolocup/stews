const Bean = require('../index.js');


function BeanStartsWith(...args) {
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.ints.flat();

        for (let i = 0; i < args.length; i++) {
            if (stuff.startsWith(args[i])) return true;
        }
        return false;
}


Bean.newF("startsWith", BeanStartsWith);
