const Noodle = require('../index.js');
const Soup = require('@stews/soup');


function NoodleDelete(index) {
	var returns;
		
    returns = { char: this.get(index), index: index };
    
    let stuff = Soup.from(this.content);
    delete stuff[index];
    
    this.content = stuff.join("");
    
    return returns;
}


Noodle.newF("delete", NoodleDelete);
Noodle.newF("del", NoodleDelete);
Noodle.newF("remove", NoodleDelete);
Noodle.newF("rem", NoodleDelete);
