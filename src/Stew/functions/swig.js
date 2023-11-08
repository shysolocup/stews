const Stew = require('../index.js');


function StewSwig(func) {
	if (this.type == "pair") {
            for (let i = 0; i < this.length; i++) {
                if (func(this.keys[i], this.values[i], i)) return true;
            }
        }
        else if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (func(Array.from(this.insides)[i], i)) return true;
            }
        }

        return false;
}


Stew.newF("swig", StewSwig);
Stew.newF("some", StewSwig);
