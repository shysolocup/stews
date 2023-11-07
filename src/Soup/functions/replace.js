const Soup = require('../index.js');


function SoupReplace(entry, replaceWith) {
	let thing = this.copy();
	if (thing.type == "list") {
		for (let i = 0; i < thing.length; i++) {
			if (thing[i].includes(entry)) {
				thing.set(i, thing[i].replace(entry, replaceWith));
				break;
			}
		}
	}
	else if (thing.type == "pair") {
		for (let i = 0; i < thing.length; i++) {
			if (thing.keys[i].includes(entry)) {
				thing.rename(i, thing.keys[i].replace(entry, replaceWith));
				break;
			}
		}
	}

	return thing;
}


Soup.newF("replace", SoupReplace);
