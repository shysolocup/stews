const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleChugWords(func) {
	let stuff = Soup.from(this.copy(), " ");
		return stuff.chug(func);
}


Noodle.newF("chugWords", NoodleChugWords);
Noodle.newF("everyWord", NoodleChugWords);
