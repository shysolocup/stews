const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanDelete(index) {
	var returns = { int: this.get(index), index: index };
	
	var stuff = new Soup(Array);
	var stuff2 = new Soup(Array);

	if (this.ints[0] instanceof Array) {
		this.ints[0].forEach( (v, i) => {
	        if (i != index) stuff.push(v);
		});
		this.ints[1].forEach( (v, i) => {
	        if (i+(this.ints[0].length) != index) stuff2.push(v);
		});
		
		this.content = parseFloat(`${stuff.join("")}.${stuff2.join("")}`);
	}
	else {
		this.ints.forEach( (v, i) => {
	        if (i != index) stuff.push(v);
		});
		
		this.content = parseFloat(stuff.join(""));
	}

    return returns;
}


Bean.newF("delete", BeanDelete);
Bean.newF("del", BeanDelete);
Bean.newF("remove", BeanDelete);
Bean.newF("rem", BeanDelete);
