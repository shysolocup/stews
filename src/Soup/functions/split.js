const Soup = require('../index.js');


function SoupSplit(/**/) {
	var args = Array.from(arguments);
	if (args[0] instanceof Array) args = args[0];
	var stuff = this.copy();
	stuff = stuff.vary({
		list() {
			let things = stuff.map( (v) => {
				if (typeof v == "string") {
					args.forEach( (sep) => { v = v.split(sep).join("<=SPLITHERE=>") } );
					return v.split("<=SPLITHERE=>");
				}
				else {
					return [v];
				}
			});

			things = things.pour().flat();
			things = things.filter( (v) => { return v != ""});
			return things;
		},
		pair() {
			let things = stuff.map( (k, v) => {
				if (typeof v == "string") {
					args.forEach( (sep) => { if (v.includes(sep)) v = v.split(sep).join("<=SPLITHERE=>") } );
					return v.split("<=SPLITHERE=>");
				}
				else {
					return v;
				}
			});

			things = things.map( (k, v) => {
				return (v instanceof Array) ? v.filter( (inner) => { return inner != ""}) : v;
			});
			
			return things;
		}
	});

	return new this.constructor(stuff);
}


Soup.newF("split", SoupSplit);
