const Bean = require('../index.js');


function BeanLastIndexOf(entry) {
	return this.ints.flat().lastIndexOf(entry);
}


Bean.newF("lastIndexOf", BeanLastIndexOf);
