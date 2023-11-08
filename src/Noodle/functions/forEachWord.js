const Noodle = require('../index.js');


function NoodleForEachWord(func) {
	for (let i = 0; i < this.wordCount; i++) {
			func(this.getWord(i));
		}
}


Noodle.newF("forEachWord", NoodleForEachWord);
