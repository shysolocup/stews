const Noodle = require('../index.js');


function NoodleReverseWords() {
  let copy = this.copy();
  copy.content = copy.content.split(" ").reverse().join(" "));
  return copy;
}


Noodle.newF("reverseWords", NoodleReverseWords);
Noodle.newF("flipWords", NoodleReverseWords);
