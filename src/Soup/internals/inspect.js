const Soup = require('../index.js');
const util = require('util');


Soup.prototype[util.inspect.custom] = function(depth, opts) {
  opts.colors = true;
  
  return `Soup(${this.length}) ${util.inspect(this.insides, { colors: true })}`;
}
