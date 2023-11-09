const Soup = require('../index.js');
const util = require('util');


Soup.prototype[util.inspect.custom] = function(depth, opts) {  
  return `Soup(${this.length}) ${util.inspect(this.insides)}`;
}
