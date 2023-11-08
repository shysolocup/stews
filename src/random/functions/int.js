const random = require('../index.js');


function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


random.newF("int", RandomInt);
random.newF("randint", RandomInt);
random.newF("number", RandomInt);
