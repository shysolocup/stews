const Noodle = require('../index.js');


function NoodleGetCodePoint(index) {
	return this.content.codePointAt(index);
}


Noodle.newF("getCodePoint", NoodleGetCodePoint);
Noodle.newF("codePointAt", NoodleGetCodePoint);
