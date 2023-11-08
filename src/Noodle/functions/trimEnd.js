const Noodle = require('../index.js');


function NoodleTrimEnd() {
	let stuff = this.copy();
	stuff.content = stuff.content.trimEnd();
  return stuff;
}


Noodle.newF("trimEnd", NoodleTrimEnd);
