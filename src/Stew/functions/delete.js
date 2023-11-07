const Stew = require('../index.js');

function StewDelete(entry) {
	var returns;
	if (this.type == "pair") {
		if (typeof entry == "number") returns = { key: this.keys[entry], value: this.values[entry], index: entry};
		else if (typeof entry == "string") returns = { key: this.keys[this.indexOf(entry)], value: this.values[this.indexOf(entry)], index: this.indexOf(entry)};
	}
	else if (this.type == "list") {
		if (typeof entry == "number") returns = { value: this.values[entry], index: entry};
		else if (typeof entry == "string") returns = { value: this.values[this.indexOf(entry)], index: this.indexOf(entry)};
	}
	delete this[entry];
	return returns;
}


Stew.newF("delete", StewDelete);
Stew.newF("del", StewDelete);
Stew.newF("remove", StewDelete);
Stew.newF("rem", StewDelete);
