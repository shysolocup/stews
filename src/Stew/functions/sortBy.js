const Stew = require('../index.js');


function StewSortBy(obj, compare=null) {
	if (!obj.type) obj = Soup.from(obj);
        obj = obj.copy();
		var copy = this.copy();

        var stuff = [];

        obj.sort( (rawA, rawB) => {
            let a = (typeof rawA == "string") ? rawA.toUpperCase().localeCompare(rawB) : rawA;
            let b = (typeof rawB == "string") ? rawB.toUpperCase().localeCompare(rawA) : rawB;

            stuff.push( [a, b] );

            return (compare) ? compare(a, b) : a - b;
        });

        var i = 0;
        
        return new copy.constructor(copy.sort( (_a, _b) => {
            let [a, b] = stuff[i]; i++;

            return (compare) ? compare(a, b) : a - b;
        }));
}


Stew.newF("sortBy", StewSortBy);
