const Bean = require('../index.js');


function BeanIndexOf(entry) {
	return this.ints.flat().indexOf(entry);
}


Bean.newF("indexOf", BeanIndexOf);
