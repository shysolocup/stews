const Noodle = require('../index.js');


function NoodlePopWord(offset=0) {
	let index = (this.wordCount-1)-offset;
        let returns = { value: this.getWord(index), index: index };
        this.deleteWord(index);
        return returns;
}


Noodle.newF("popWord", NoodlePopWord);
