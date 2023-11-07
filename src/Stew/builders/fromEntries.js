const Stew = require('../index.js');


Object.defineProperty( Stew, "fromEntries", {
	value: (entries) => { return new Stew(Object.fromEntries(entries)); }
});
