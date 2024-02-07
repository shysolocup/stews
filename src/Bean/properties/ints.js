const Bean = require('../index.js');


function BeanInts() {
	let seps = this.content.toString()
	if (seps.includes(".")) {
		seps = seps.split(".");
		seps = seps.map( sep => sep.split("").map( i => (Number(i)+1) ? Number(i) : i ));
	}
	else {	
		seps = seps.split("");
		seps = seps.map( i => (Number(i)+1) ? Number(i) : i );
	}

	return seps;
}


Bean.newP("ints", BeanInts);
