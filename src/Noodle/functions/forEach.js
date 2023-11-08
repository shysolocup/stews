const Noodle = require('../index.js');


function NoodleForEach(func) {
	for (let i = 0; i < this.length; i++) {
			func(this.get(i));
		}
}


Noodle.newF("forEach", NoodleForEach);
