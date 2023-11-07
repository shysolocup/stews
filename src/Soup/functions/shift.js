const Soup = require('../index.js');


function SoupShift(offset=0) {
	let index = 0+offset;
	let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
	delete this[index];
	return returns;
}


Soup.newF("shift", SoupShift);
Soup.newF("unpull", SoupShift);
