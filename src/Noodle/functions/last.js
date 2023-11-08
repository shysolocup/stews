const Noodle = require('../index.js');


function NoodleLast(offset=0) {
	return this.get( (this.length-1)-offset );
}


Noodle.newF("last", NoodleLast);
Noodle.newF("back", NoodleLast);
Noodle.newF("end", NoodleLast);
