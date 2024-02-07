const Bean = require('../index.js');
const util = require('util');


Bean.prototype[util.inspect.custom] = function(depth, opts) {
    opts.colors = true;
    return `Bean(${this.length}) ${util.inspect(this.content, { colors: true })}`;
}
