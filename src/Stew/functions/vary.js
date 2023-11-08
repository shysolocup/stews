const Stew = require('../index.js');
const Soup = require('@stews/soup');


function StewVary(obj) {
	let thing = Soup.from(obj).toLowerCase()[this.type];
	this.constructor.prototype.VaryFunction = thing;
	let returns = this.VaryFunction();
	delete this.constructor.prototype.VaryFunction;
	return returns;
}


Stew.newF("vary", StewVary);
