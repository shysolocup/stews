const random = require('../index.js');


function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


random.newF("number", RandomNumber);
random.newF("int", RandomNumber);
random.newF("randint", RandomNumber);
