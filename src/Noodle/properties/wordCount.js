const Noodle = require('../index.js');


function NoodleWordCount() {
	return this.content.split(" ").length;
}


Noodle.newP("wordCount", NoodleWordCount);
