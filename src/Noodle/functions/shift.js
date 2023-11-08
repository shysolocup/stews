const Noodle = require('../index.js');


function NoodleShift(offset=0) {
	let index = 0+offset;
        let returns = { value: this.get(index), index: index };
        this.delete(index);
        return returns;
}


Noodle.newF("shift", NoodleShift);
Noodle.newF("unpull", NoodleShift);
