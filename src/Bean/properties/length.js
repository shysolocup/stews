const Bean = require('../index.js');


function BeanLength() {
	return this.ints.flat().length;
}


Bean.newP("length", BeanLength);
Bean.newP("size", BeanLength);
