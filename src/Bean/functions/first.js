const Bean = require('../index.js');


function BeanFirst(offset=0) {
	return this.get(0+offset);
}


Bean.newF("first", BeanFirst);
Bean.newF("front", BeanFirst);
Bean.newF("start", BeanFirst);
