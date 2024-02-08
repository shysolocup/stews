const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanScoop(/**/) {
	var args = Array.from(arguments);
        var stuff = this.copy();

        if (args[0] instanceof Array) args = args[0];
		
        this.content = parseFloat(Soup.from(this.content.toString()).filter( (value, index) => {
            if (args[0] instanceof Function) return !args[0](value, index);
            return !args.includes(index) && !args.includes(value);
        }).join(""));
        
		return stuff;
}


Bean.newF("scoop", BeanScoop);
