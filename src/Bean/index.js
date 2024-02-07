/*
	# @stews/bean #
	:: created by @paishee/@nuttmegg using ::
	- aepl: https://github.com/paishee/aepl
  
	## LINKS ##
	- https://github.com/paishee/stews/tree/main/src/Bean
	- https://npmjs.com/package/@stews/bean

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
cl.init("Bean", class {
    constructor(object, joiner="") {

		// constructs
		const __form = require('./construct/__form.js');
		const __proxy = require('./construct/__proxy/index.js');

				
		// formatting construct
		__form.bind(this)(object, joiner);


		Object.defineProperty(this, "joiner", {
            value: new joiner.constructor(joiner)
        });


		// creates the proxy
        return new Proxy(this, __proxy);
	}
});



// export
module.exports = Bean;



// compilers
const compile = require('./compile');
compile('/builders');
compile('/functions');
compile('/properties');
compile('/internals');
