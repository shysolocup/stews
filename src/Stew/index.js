/*
	# @stews/stew #
	:: created by @paishee/@nuttmegg using ::
	- aepl: https://github.com/paigeroid/aepl
  
	## LINKS ##
	- https://github.com/paishee/stews/tree/main/src/Stew
	- https://npmjs.com/package/@stews/stew

 	## MAIN ##
	- https://github.com/paishee/stews
	- https://npmjs.com/package/stews

 	## PARTS ##
   	- https://npmjs.com/package/@stews/soup
	- https://npmjs.com/package/@stews/stew
 	- https://npmjs.com/package/@stews/noodle
 	- https://npmjs.com/package/@stews/random

*/


// imports
const cl = require('aepl');
const fs = require('fs');



// main class
cl.init("Stew", class {
    constructor(object, splitter='') {

		// constructs
		const __form = require('./construct/__form.js');
		const __proxy = require('./construct/__proxy/index.js');

		
		// formatting construct
		__form.bind(this)(object, splitter);
		

		// adds splitter property
        Object.defineProperty(this, "splitter", {
            value: new String(splitter)
        });


		// creates the proxy
        return new Proxy(this, __proxy);
	}
});



// export
module.exports = Stew;



// compilers
const compile = require('./compile');
compile('/builders');
compile('/functions');
compile('/properties');
compile('/internals');
