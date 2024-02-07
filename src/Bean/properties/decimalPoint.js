const Bean = require('../index.js');


function BeanDecimalPoint() {
	return this.content.toString().indexOf(".");
}


Bean.newP("decimalPoint", BeanDecimalPoint);
Bean.newP("decPoint", BeanDecimalPoint);
Bean.newP("point", BeanDecimalPoint);
