const Noodle = require('../index.js');


function NoodleGetCharCode(index) {
	return this.content.charCodeAt(index)
}


Noodle.newF("getCharCode", NoodleGetCharCode);
Noodle.newF("charCodeAt", NoodleGetCharCode);
