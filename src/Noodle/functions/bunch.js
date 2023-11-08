const Noodle = require('../index.js');


function NoodleBunch() {
	let stuff = this.copy();
	stuff.content = stuff.content.replace(/(\r\n|\n|\r)/gm," ");
  return stuff;
}


Noodle.newF("bunch", NoodleBunch);
