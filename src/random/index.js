const cl = require('aepl');

cl.init("random");

module.exports = random;

const compile = require('./compile');
compile('functions');
compile('spreads');
