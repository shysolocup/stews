const Noodle = require('../index.js');


function NoodleTrimStart() {
	let stuff = this.copy();
	stuff.content = stuff.content.trimStart();
  return stuff;
}


Noodle.newF("trimStart", NoodleTrimStart);
