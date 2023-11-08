const Soup = require('@stews/soup');
const random = require('../index.js');

Soup.newP("random", function() {
  return new random(this);
});
