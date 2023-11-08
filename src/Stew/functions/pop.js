const Stew = require('../index.js');


function StewPop(offset=0) {
	let index = (this.length-1)-offset;
	let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
	delete this[index];
	return returns;
}


Stew.newF("pop", StewPop);
Stew.newF("unpush", StewPop);
