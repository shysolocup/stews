const Bean = require('../index.js');


function BeanEndsWith(...args) {
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.ints;

        for (let i = 0; i < args.length; i++) {
            if (stuff.endsWith(args[i])) return true;
        }
        return false;
}


Bean.newF("endsWith", BeanEndsWith);
