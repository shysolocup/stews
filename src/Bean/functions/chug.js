const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanChug(func) {
	let stuff = Soup.from(this.copy().toString().replace(".", ""), "").map( i => (Number(i)+1) ? Number(i) : i );
	return stuff.chug(func);
}


Bean.newF("chug", BeanChug);
Bean.newF("every", BeanChug);
