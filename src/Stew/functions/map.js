const Stew = require('../index.js');


function StewMap(func) {
	if (this.type == "pair") {
            let thing = this.entries;

            this.forEach( (key, value, index) => {
                thing[index][1] = func(key, value, index);
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


Stew.newF("map", StewMap);
