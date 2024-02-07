const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanAppend(index, set_to=null) {
	var stuff;
    stuff = new Soup(Array);
    
    this.ints.forEach( (v, i) => {
        if (i == index) stuff.push(set_to);
        stuff.push(v);
    });

    this.content = parseFloat(stuff.join(""));

    return this;
}


Bean.newF("append", BeanAppend);
Bean.newF("insert", BeanAppend);
Bean.newF("push_at", BeanAppend);
Bean.newF("push_to", BeanAppend);
