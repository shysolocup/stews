const Noodle = require('../index.js');


function NoodleWords() {
	return this.content.split(" ");
}


Noodle.newP("words", NoodleWords);
Noodle.newP("sections", NoodleWords);
