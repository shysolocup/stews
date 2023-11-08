const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodlePull(value=null) {
	let stuff = Soup.from(this.content);
		stuff.pull(value);
		return this.content = stuff.join("");
}


Noodle.newF("pull", NoodlePull);
Noodle.newF("unshift", NoodlePull);
Noodle.newF("push_front", NoodlePull);
