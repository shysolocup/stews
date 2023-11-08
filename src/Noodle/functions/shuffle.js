const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleShuffle() {
	let stuff = (Soup.from(this.copy())).shuffle();
	return new Noodle(stuff.join(""));
}


Noodle.newF("shuffle", NoodleShuffle);
