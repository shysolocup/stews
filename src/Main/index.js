/*
	# Stews #
	:: created by @paigeroid/@nuttmegg using ::
	- aepl: https://github.com/paigeroid/aepl
  
	## LINKS ##
	- https://github.com/paigeroid/stews
	- https://npmjs.com/package/stews

 	## PARTS ##
  - https://npmjs.com/package/@stews/soup
	- https://npmjs.com/package/@stews/stew
 	- https://npmjs.com/package/@stews/noodle
  	- https://npmjs.com/package/@stews/random

*/



// imports
const Stew = require('@stews/stew');
const Soup = require('@stews/soup');
const Noodle = require('@stews/noodle');
const random = new (require('@stews/random'));



// exports
module.exports = { Stew, Soup, Noodle, random };
