const Bean = require('../index.js');


function BeanInts() {
	return this.content.toString().split("").map( i => parseInt(i) );
}


Noodle.newP("ints", BeanInts);
