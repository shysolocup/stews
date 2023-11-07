const Stew = require('../index.js');


function StewValues() {
	 return Array.from(this.insides.values());
}


Stew.newP("values", StewValues);
