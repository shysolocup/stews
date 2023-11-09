const Soup = require('../index.js');
const util = require('util');


Soup.newF([util.inspect.custom], function(depth, opts) {
  return `Soup(${this.length}) ${this.stringify(null, 4)}`;
});
