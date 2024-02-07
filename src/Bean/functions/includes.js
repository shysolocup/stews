const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanIncludes(...args) {
    if (args.length == 1 && args[0] instanceof Array) args = args[0];
    return args.some( (v) => { return this.content.toString().includes(v.toString()); });
}


Bean.newF("includes", BeanIncludes);
Bean.newF("contains", BeanIncludes);
Bean.newF("has", BeanIncludes);
