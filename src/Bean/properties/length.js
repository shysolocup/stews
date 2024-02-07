const Bean = require('../index.js');


function BeanLength() {
	return this.content.toString().split("").length;
}


Bean.newP("length", BeanLength);
Bean.newP("size", BeanLength);
