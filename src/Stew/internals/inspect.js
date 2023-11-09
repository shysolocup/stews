const Stew = require('../index.js');
const util = require('util');


Stew.prototype[util.inspect.custom] = function(depth, opts) {
  opts.colors = true;
  
  return `Stew(${this.length}) ${util.inspect(this.insides, { colors: true })}`;
}
