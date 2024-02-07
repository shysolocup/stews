const Bean = require('../index.js');


function BeanCopy() {
	return new this.constructor(this);
}


Bean.newF("copy", BeanCopy);
Bean.newF("clone", BeanCopy);
