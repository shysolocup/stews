const Stew = require('../index.js');


function StewSort(compare=null) {
	if (this.type == "list") {
            return new this.constructor(new Set(this.pour().sort( (rawA, rawB) => {
                let a = (typeof rawA == "string") ? rawA.toUpperCase().localeCompare(rawB) : rawA;
                let b = (typeof rawB == "string") ? rawB.toUpperCase().localeCompare(rawA) : rawB;

                return (compare) ? compare(a, b) : a - b;
            })));
        }

        else if (this.type == "pair") {
            return new this.constructor(new Map(this.entries.sort( (rawA, rawB) => {
                let a = (typeof rawA[0] == "string") ? rawA[0].toUpperCase().localeCompare(rawB[0]) : rawA[0];
                let b = (typeof rawB[0] == "string") ? rawB[0].toUpperCase().localeCompare(rawA[0]) : rawB[0];

                return (compare) ? compare(a, b) : a - b;
            })));
        }
}


Stew.newF("sort", StewSort);
