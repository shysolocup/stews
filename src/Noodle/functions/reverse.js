const Noodle = require('../index.js');


function NoodleReverse() {
  return this.contents.split("").reverse().join("");
}


Noodle.newF("reverse", NoodleReverse);
Noodle.newF("flip", NoodleReverse);
