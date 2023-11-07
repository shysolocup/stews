const Stew = require('../index.js');


function StewFind(entry, exact=false) {
	var indexes = [];
        if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (entry instanceof Function) if (entry(this[i], i)) indexes.push(i);
                if (!exact && this[i].includes(entry)) indexes.push(i);
                else if (this[i] == entry) indexes.push(i);
            }
        }
        else if (this.type == "pair") {
            for (let i = 0; i < this.keys.length; i++) {
                if (entry instanceof Function) if (entry(this.keys[i], this.values[i], i)) indexes.push(i);
                if (!exact && this.keys[i].includes(entry)) indexes.push(i);
                else if (this.keys[i] == entry) indexes.push(i);
            }
        }
        return indexes;
}


Stew.newF("find", StewFind);
