const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanMap(func) {
    let copy = this.copy();
    
	if (copy.ints[0] instanceof Array) {
		stuff = new Soup( copy.ints[0].map(func) )
		stuff2 = this.ints[1].forEach( (v, i) => {
	        if (i+(this.ints[0].length) == index) stuff2.push(set_to);
	        stuff2.push(v);
		});
		
		this.content = parseFloat(`${stuff.join("")}.${stuff2.join("")}`);
	}
	else {
        stuff = new Soup( this.ints.map(func) );
		this.content = parseFloat(stuff.join(""));
	}

    return this;
}


Bean.newF("map", BeanMap);
