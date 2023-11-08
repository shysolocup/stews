const Noodle = require('../index.js');


function NoodleTrim() {
	let stuff = this.copy();
	stuff.content = stuff.content.trim();
  return stuff;
}


Noodle.newF("trim", NoodleTrim);
