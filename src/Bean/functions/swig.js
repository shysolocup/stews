const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanSwig(func) {
	let stuff = Soup.from(this.copy().toString().replace(".", ""), "").map( i => (Number(i)+1) ? Number(i) : i );
	return stuff.swig(func);
}


Bean.newF("swig", BeanSwig);
Bean.newF("some", BeanSwig);
