const Soup = require('../index.js');


function SoupAppend(index, key, value=null) {
	var stuff;
	if (this.type == "list") {
		stuff = new Soup(Array);
		this.forEach( (v, i) => {
			if (i == index) stuff.push(key);
			stuff.push(v);
		});
	}
	else if (this.type == "pair") {
		stuff = new Soup(Object);
		this.forEach( (k, v, i) => {
			if (i == index) stuff.push(key, value);
			stuff.push(k, v);
		});
	}
	
	this.insides = stuff.pour();
}


Soup.newF("append", SoupAppend);
Soup.newF("insert", SoupAppend);
