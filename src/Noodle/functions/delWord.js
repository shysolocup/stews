const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleDelWord(index) {
	var returns;
		
    returns = { char: this.getWord(index), index: index };

    let stuff = Soup.from(this.content, " ");
    delete stuff[index];

    this.content = stuff.join(" ");
    
    return returns;
}


Noodle.newF("delWord", NoodleDelWord);
Noodle.newF("remWord", NoodleDelWord);
