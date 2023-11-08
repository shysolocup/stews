const Noodle = require('../index.js');


function NoodleReverseWords() {
  return new Noodle(this.content.split(" ").reverse().join(" "));
}


Noodle.newF("reverseWords", NoodleReverseWords);
Noodle.newF("flipWords", NoodleReverseWords);
