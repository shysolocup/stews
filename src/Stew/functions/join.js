const Stew = require('../index.js');


function StewJoin(joiner=",") {
	return (this.type == "list") ? Array.from(this.insides).join(joiner) : this.keys.join(joiner);
}


Stew.newF("join", StewJoin);
Stew.newF("joinKeys", StewJoin);
