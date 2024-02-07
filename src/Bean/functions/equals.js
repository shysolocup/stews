const Bean = require('../index.js');


function BeanEquals(...args) {
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.ints.flat();

        for (let i = 0; i < args.length; i++) {
            if (stuff == args[i]) return true;
        }
        return false;
}


Bean.newF("equals", BeanEquals);
Bean.newF("equalTo", BeanEquals);
