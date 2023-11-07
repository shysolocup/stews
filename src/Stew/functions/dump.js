const Stew = require('../index.js');


function StewDump(file, replacer=null, indent=null) {
	try {
		const fs = require('fs');

		fs.truncate(file, 0, () => {
			fs.writeFileSync(file, this.stringify(replacer, indent));
		});

		return Stew.parse(fs.readFileSync(file, 'utf8'));
	}
	catch(err) {}
}


Stew.newF("dump", StewDump);
