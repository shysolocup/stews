const Stew = require('../index.js');


function StewReverse() {
  let copy = this.copy();
	if (this.type == "pair") {
            copy.insides = new Map( copy.entries.reverse() );
            return copy;
        }
        else if (this.type == "list") {
            copy.insides = new Set( Array.from(copy.insides).reverse() );
            return copy;
        }
}


Stew.newF("reverse", StewReverse);
Stew.newF("flip", StewReverse);
