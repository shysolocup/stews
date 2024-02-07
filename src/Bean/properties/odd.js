const Bean = require('../index.js');


function BeanOdd() {
	return (this.content % 2 == 1)
}


Bean.newP("odd", BeanOdd);
