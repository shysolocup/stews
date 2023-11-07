const Stew = require('../index.js');


function StewForEach(func) {
	for (let i = 0; i < this.length; i++) {
            if (this.type == "pair") {
                func( this.keys[i], this.values[i], i );
            }
            else if (this.type == "list") {
                func( Array.from(this.insides)[i], i );
            }
        }
}


Stew.newF("forEach", StewForEach);
