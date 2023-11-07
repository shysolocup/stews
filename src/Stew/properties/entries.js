const Stew = require('../index.js');


function StewEntries() {
	if (this.type == "pair") return Array.from(this.insides.entries());
        else if (this.type == "list") {
            let thing = Array.from(this.insides.entries());
            thing.forEach( (value, index) => {
                thing[index][0] = index.toString();
            });
            return thing;
        }
}


Soup.newP("entries", StewEntries);
