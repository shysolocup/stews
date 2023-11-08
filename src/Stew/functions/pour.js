const Soup = require('@stews/soup');
const Stew = require('../index.js');
const Noodle = require('@stews/noodle');


function StewPour(type=null, joiner='') {
	if (type instanceof Function) type = new type();
	
	if (typeof type == "string" && (type.toLowerCase() == "def" || type.toLowerCase() == "default")) return this.insides;

	else if (type instanceof Array || (typeof type == "string" && type.toLowerCase() == 'array') || (type == null && this.type == "list"))
		return (this.type=="pair") ? this.entries
		: Array.from(this.insides);

	else if (type instanceof Set || (typeof type == "string" && type.toLowerCase() == 'set'))
		return new Set(
			(this.type=="pair") ? this.entries
			: this.insides
		);
	
	else if (type instanceof Map || (typeof type == "string" && type.toLowerCase() == 'map'))
		return new Map(
			(this.type=="pair") ? this.entries : Soup.from(this.insides).entries
		);

	else if (type instanceof Stew || (typeof type == "string" && type.toLowerCase() == 'stew')) return new Stew(this.insides);
	else if (type instanceof Soup || (typeof type == "string" && type.toLowerCase() == 'soup')) return new Soup(this.insides);
	else if (type instanceof Noodle || typeof type == "string" && type.toLowerCase() == 'noodle') return new Noodle(this.insides.join(joiner));
		
	else if (type instanceof String || (typeof type == "string" && type.toLowerCase() == 'string'))
		return (this.type=="pair") ? this.keys.join(joiner) : this.insides.join(joiner);

	else if (type instanceof Object || (typeof type == "string" && type.toLowerCase() == 'object') || (type == null && this.type == "pair"))
		return Object.fromEntries(
			(this.type=="pair") ? this.entries
			: Soup.from(this.insides).entries
		);
}


Stew.newF("pour", StewPour);
Stew.newF("fix", StewPour);
Stew.newF("to", StewPour);
