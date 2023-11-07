const Stew = require('../index.js');


function StewIndexOfVal(entry) {
	if (this.type == "pair") return this.values.indexOf(entry);
	else if (this.type == "list") return this.insides.indexOf(entry);
}


Stew.newF("indexOfVal", StewIndexOfVal);
