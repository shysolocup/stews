const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanSwig(func) {
	let stuff = Soup.from(this.copy().toString(), "");
	return stuff.swig(func);
}


Bean.newF("swig", BeanSwig);
Bean.newF("some", BeanSwig);
