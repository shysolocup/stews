const Noodle = require('../index.js');


function NoodleChars() {
	return this.content.split("");
}


Noodle.newP("chars", NoodleChars);
