const Soup = require('../index.js');
const util = require('util');


Soup.prototype[util.inspect.custom] = function(depth, opts) {
  return `Soup(${this.length}) ${this.stringify(null, 4)}`;
}
