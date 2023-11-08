const Noodle = require('../index.js');


function NoodleFirstWord(offset=0) {
	return this.getWord(0+offset);
}


Noodle.newF("firstWord", NoodleFirstWord);
Noodle.newF("frontWord", NoodleFirstWord);
Noodle.newF("startWord", NoodleFirstWord);
