const Stew = require('../index.js');
const util = require('util');


Stew.newF([util.inspect.custom], function(depth, opts) {
  return `Stew(${this.length}) ${this.stringify(null, 4)}`;
});
