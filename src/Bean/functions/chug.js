const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanChug(func) {
	let stuff = Soup.from(this.copy().ints);
	return stuff.chug(func);
}


Bean.newF("chug", BeanChug);
Bean.newF("every", BeanChug);
