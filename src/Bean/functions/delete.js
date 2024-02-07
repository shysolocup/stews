const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanDelete(index) {
	var returns;
		
    returns = { char: this.get(index), index: index };
    
    let stuff = Soup.from(this.content.toString());
    delete stuff[index];
    
    this.content = parseFloat(stuff.join(""));
    
    return returns;
}


Bean.newF("delete", BeanDelete);
Bean.newF("del", BeanDelete);
Bean.newF("remove", BeanDelete);
Bean.newF("rem", BeanDelete);
