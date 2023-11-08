const Stew = require('@stews/stew');
const random = require('../index.js');

Stew.newP("random", function() {
  return new random(this);
});
