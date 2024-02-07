const Bean = require('../index.js');


function BeanEquals(...args) {
        if (args[0] instanceof Array) args = args[0];

        for (let i = 0; i < args.length; i++) {
            if (this.content == args[i]) return true;
        }
        return false;
}


Bean.newF("equals", BeanEquals);
Bean.newF("equalTo", BeanEquals);
