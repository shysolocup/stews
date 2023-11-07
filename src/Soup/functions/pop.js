const Soup = require('../index.js');


function SoupPop(offset=0) {
	let index = (this.length-1)-offset;
	let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
	delete this[index];
	return returns;
}


Soup.newF("pop", SoupPop);
Soup.newF("unpush", SoupPop);
