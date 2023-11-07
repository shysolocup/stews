const Soup = require('../index.js');


function SoupDump(file, replacer=null, indent=null) {
	try {
		const fs = require('fs');

		fs.truncate(file, 0, () => {
			fs.writeFileSync(file, this.stringify(replacer, indent));
		});

		return Soup.parse(fs.readFileSync(file, 'utf8'));
	}
	catch(err) {}
}


Soup.newF("dump", SoupDump);
