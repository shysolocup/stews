const Noodle = require('../index.js');


function NoodleLastWord(offset=0) {
	return this.getWord( (this.length-1)-offset );
}


Noodle.newF("lastWord", NoodleLastWord);
Noodle.newF("backWord", NoodleLastWord);
Noodle.newF("endWord", NoodleLastWord);
