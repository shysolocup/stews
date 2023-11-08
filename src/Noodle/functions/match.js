const Noodle = require('../index.js');


function NoodleMatch(matcher) {
	return this.content.match(matcher);
}


Noodle.newF("match", NoodleMatch);
