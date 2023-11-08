const Stew = require('../index.js');


function StewShift(offset=0) {
	let index = 0+offset;
        let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
        delete this[index];
        return returns;
}


Stew.newF("shift", StewShift);
Stew.newF("unpull", StewShift);
