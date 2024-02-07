const Bean = require('../index.js');


function BeanInts() {
	return this.content.toString().replace(".", "").split("").map( i => (Number(i)+1) ? Number(i) : i );
}


Bean.newP("ints", BeanInts);
