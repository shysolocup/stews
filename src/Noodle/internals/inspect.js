const Noodle = require('../index.js');
const util = require('util');


Noodle.newF([util.inspect.custom], function(depth, opts) {
  return `Noodle(${this.length}) ${this.stringify(null, 4)}`;
});
