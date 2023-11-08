const Stew = require('../index.js');
const Soup = require('@stews/soup');


function StewShuffle() {
	let stuff = (Soup.from(this.copy())).shuffle();
	return stuff.pour(Stew);
}


Stew.newF("shuffle", StewShuffle);
