const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanFilter(func) {
	var stuff;
	var stuff2;

	if (this.ints[0] instanceof Array) {
        stuff = Soup.from(this.ints[0]);
        stuff2 = Soup.from(this.ints[1]);
        
		stuff = stuff.filter(func);
		stuff2 = stuff2.filter( (v, i) => func(v, i+(stuff.length)) );
		
		this.content = parseFloat(`${stuff.join("")}.${stuff2.join("")}`);
	}
	else {
        stuff = Soup.from(this.ints);
		stuff = stuff.filter(func);
        
		this.content = parseFloat(stuff.join(""));
	}
}


Bean.newF("filter", BeanFilter);
