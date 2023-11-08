const Noodle = require('../index.js');


function NoodleReverseWords() {
  return this.contents.split(" ").reverse().join(" ");
}


Noodle.newF("reverseWords", NoodleReverseWords);
Noodle.newF("flipWords", NoodleReverseWords);
