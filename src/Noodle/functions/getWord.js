const Noodle = require('../index.js');


function NoodleGetWord(index) {
	return this.content.split(" ")[index]
}


Noodle.newF("getWord", NoodleGetWord);
Noodle.newF("wordAt", NoodleGetWord);
