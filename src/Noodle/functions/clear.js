const Noodle = require('../index.js');


function NoodleClear() {
	let copy = this.copy();
  copy.content = "";
  return copy;
}


Noodle.newF("clear", NoodleClear);
