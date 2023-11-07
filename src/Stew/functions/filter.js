const Stew = require('../index.js');


function StewFilter(func) {
	if (this.type == "pair") {
            let entries = this.entries;
            entries.forEach( (entry, index) => {
                entries[index] = { key: entry[0], value: entry[1], index: index };
            });

            let filt = entries.filter( (stuff) => func(stuff.key, stuff.value, stuff.index));

            filt.forEach( (entry, index) => {
                filt[index] = [ entry.key, entry.value ];
            });

            return new Stew(Object.fromEntries(filt));
        }
        else if (this.type == "list") {
            return new Stew(Array.from(this.insides).filter( (stuff, index) => func(stuff, index)));
        }
}


Stew.newF("filter", StewFilter);
