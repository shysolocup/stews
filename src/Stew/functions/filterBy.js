const Stew = require('../index.js');


function StewFilterBy(obj, func) {
	if (!obj.type) obj = Stew.from(obj);

	if (this.type == "list") {
		return this.filter( (value, index) => {
			return func(obj.values[index], index);
		});
	}
	else if (this.type == "pair") {
		return this.filter( (key, value, index) => {
			return func(obj.keys[index], obj.values[index], index);
		});
	}
}


Stew.newF("filterBy", StewFilterBy);
