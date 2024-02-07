const Bean = require('../index.js');


function BeanMerge(...args) {
    if (this.ints[0] instanceof Array) {
		this.ints[0].forEach( (v, i) => {
	        if (i == index) stuff.push(set_to);
	        stuff.push(v);
		});
		this.ints[1].forEach( (v, i) => {
	        if (i+(this.ints[0].length) == index) stuff2.push(set_to);
	        stuff2.push(v);
		});
		
		this.content = parseFloat(`${stuff.join("")}.${stuff2.join("")}`);
	}
	else {
		this.ints.forEach( (v, i) => {
	        if (i == index) stuff.push(set_to);
	        stuff.push(v);
		});
		
		this.content = parseFloat(stuff.join(""));
	}

    let stuff = this.copy();
    
    if (args[0] instanceof Array) args = args[0];

    for (let obj of args) {
        let thing = new Bean(obj);

        stuff.content = stuff.content.concat(joiner, thing.content);
    }

    return stuff;
}


Bean.newF("merge", BeanMerge);
Bean.newF("concat", BeanMerge);
