const Noodle = require('@stews/noodle');
const random = require('../index.js');

Noodle.newP("random", function() {
  return new random(this);
});
