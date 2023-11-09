const Noodle = require('../index.js');
const util = require('util');


Noodle.prototype[util.inspect.custom] = function(depth, opts) {
  opts.colors = true;
  
  return `Noodle(${this.length}) ${util.inspect(this.content, { colors: true })}`;
}
