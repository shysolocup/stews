const Noodle = require('../index.js');


function NoodleShiftWord(offset=0) {
	let index = 0+offset;
        let returns = { value: this.getWord(index), index: index };
        this.deleteWord(index);
        return returns;
}


Noodle.newF("shiftWord", NoodleShiftWord);
