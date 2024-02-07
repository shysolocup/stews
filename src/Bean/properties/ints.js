const Bean = require('../index.js');


function BeanInts() {
	return this.content.toString().split("").map( i => parseInt(i) );
}


Bean.newP("ints", BeanInts);
