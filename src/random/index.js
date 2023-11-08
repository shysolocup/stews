const cl = require('aepl');

cl.init("random", class {
  constructor(bind=null) {
    if (bind) this.bind = bind;
  }
});

module.exports = random;

const compile = require('./compile');
compile('functions');
compile('spreads');
