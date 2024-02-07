/*
	# Stews #
	:: created by @paishee/@nuttmegg using ::
	- aepl: https://github.com/paishee/aepl
  
	## LINKS ##
	- https://github.com/paishee/stews
	- https://npmjs.com/package/stews

 	## PARTS ##
  - https://npmjs.com/package/@stews/soup
	- https://npmjs.com/package/@stews/stew
 	- https://npmjs.com/package/@stews/noodle
  	- https://npmjs.com/package/@stews/random
   	- https://npmjs.com/package/@stews/bean

*/



// imports

let [ Stew, Soup, Noodle, Bean, random ]=[];
try { Stew = require('../Stew'); } catch(e) { Stew = require('@stews/stew'); }
try { Soup = require('../Soup'); } catch(e) { Soup = require('@stews/soup'); }
try { Noodle = require('../Noodle'); } catch(e) { Noodle = require('@stews/noodle'); }
try { Bean = require('../Bean'); } catch(e) { Noodle = require('@stews/bean'); }
try { random = new (require('../random')); } catch(e) { random = new (require('@stews/random')); }


// exports
module.exports = { Stew, Soup, Noodle, Bean, random };
