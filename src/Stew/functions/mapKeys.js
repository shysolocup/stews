const Stew = require('../index.js');


function StewMapKeys(func) {
	if (this.type == "pair") {
            let thing = this.copy();

            this.forEach( (key, value, index) => {
                thing.rename(index, func(key, value, index));
            });
            
            return new Stew(new Map(thing));
        }
        else if (this.type == "list") {
            let thing = Array.from(this.copy().insides);
            this.forEach( (value, index) => {
                thing[index] = func(value, index);
            });

            return new Stew(new Set(thing));
        }
}


Stew.newF("mapKey", StewMapKeys);
Stew.newF("mapKeys", StewMapKeys);
