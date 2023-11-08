const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleAppend(index, set_to=null) {
	var stuff;
		stuff = new Soup(Array);
		
		this.content.split("").forEach( (v, i) => {
			if (i == index) stuff.push(value);
			stuff.push(v);
		});

		this.content = stuff.join("");

		return this;
}


Noodle.newF("append", NoodleAppend);
Noodle.newF("insert", NoodleAppend);
