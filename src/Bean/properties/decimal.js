const Bean = require('../index.js');


function BeanDecimal() {
	return this.content.toString().indexOf(".");
}


Bean.newP("decimal", BeanDecimal);
Bean.newP("dec", BeanDecimal);
