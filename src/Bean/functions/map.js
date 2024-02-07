const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanMap(func) {
    let copy = this.copy();
    
	if (copy.ints[0] instanceof Array) {
		stuff = new Soup( copy.ints[0].map(func) );
		stuff2 = new Soup( copy.ints[1].map( (v, i) => func(v, i+(copy.ints[0].length)) ));
		
		copy.content = parseFloat(`${stuff.join("")}.${stuff2.join("")}`);
	}
	else {
        stuff = new Soup( copy.ints.map(func) );
		copy.content = parseFloat(stuff.join(""));
	}

    return copy;
}


Bean.newF("map", BeanMap);
