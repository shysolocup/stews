const Noodle = require('../index.js');
const util = require('util');


Noodle.prototype[util.inspect.custom] = function(depth, opts) {
  return `Noodle(${this.length}) "${this.content}"`;
}
