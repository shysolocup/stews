const Noodle = require('../index.js');


function NoodleReverse() {
  return this.content.split("").reverse().join("");
}


Noodle.newF("reverse", NoodleReverse);
Noodle.newF("flip", NoodleReverse);
