const Noodle = require('../index.js');


function NoodleReverse() {
  let copy = this.copy();
  copy.content = copy.content.split("").reverse().join(""));
  return copy;
}


Noodle.newF("reverse", NoodleReverse);
Noodle.newF("flip", NoodleReverse);
