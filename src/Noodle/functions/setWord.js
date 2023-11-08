const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleSetWord(index, set_to=null) {
	let stuff = Soup.from(this.content, " ");
        stuff.set(index, set_to);
		return this.content = stuff.join(" ");
}


Noodle.newF("setWord", NoodleSetWord);
