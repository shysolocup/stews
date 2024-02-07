const Bean = require('../index.js');


function BeanEven() {
	return (this.content % 2 == 0)
}


Bean.newP("even", BeanEven);
