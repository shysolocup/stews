const Stew = require('../index.js');
const util = require('util');


Stew.prototype[util.inspect.custom] = function(depth, opts) {
  return `Stew(${this.length}) ${this.stringify(null, 4)}`;
}
