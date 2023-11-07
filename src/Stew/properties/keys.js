const Stew = require('../index.js');


function StewKeys() {
	 return (this.type == "pair") ? Array.from(this.insides.keys()) : this.entries.map( (entry) => { return entry[0] } );
}


Stew.newP("keys", StewKeys);
