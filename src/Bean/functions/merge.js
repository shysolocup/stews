const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanMerge(...args) {
	let clone = this.copy();
	
	args.forEach( a => {

		if ( !(a instanceof Bean) ) a = Bean.from(a);
		
		if (clone.ints[0] instanceof Array) {
			let stuff = Soup.from(clone.ints[0]);
			let stuff2 = Soup.from(clone.ints[1]);

			if (a.ints[0] instanceof Array) {
				a.ints[0].forEach( v => stuff.push(v));
				a.ints[1].forEach( v => stuff2.push(v));
			}
			else {
				a.ints.forEach( v => stuff.push(v) );
			}
			
			clone.content = parseFloat(`${stuff.join("")}.${stuff2.join("")}`);
		}
		else {
			let stuff = Soup.from(clone.ints);
			let stuff2 = Soup.from(Array);
			
			if (a.ints[0] instanceof Array) {
				a.ints[0].forEach( v => stuff.push(v));
				a.ints[1].forEach( v => stuff2.push(v));
			}
			else {
				a.ints.forEach( v => stuff.push(v) );
			}
			
			clone.content = parseFloat(`${stuff.join("")}.${stuff2.join("")}`);
		}
	});

    return clone;
}


Bean.newF("merge", BeanMerge);
Bean.newF("concat", BeanMerge);
