/*
	# @stews/random #
	:: created by @paishee using ::
	- aepl: https://github.com/paishee/aepl
  
	## LINKS ##
	- https://github.com/paishee/stews/tree/main/src/random
	- https://npmjs.com/package/@stews/random

 	## MAIN ##
	- https://github.com/paishee/stews
	- https://npmjs.com/package/stews

 	## PARTS ##
   	- https://npmjs.com/package/@stews/soup
	- https://npmjs.com/package/@stews/stew
 	- https://npmjs.com/package/@stews/noodle
  	- https://npmjs.com/package/@stews/random

*/


const cl = require('aepl');

cl.init("random", class {
  constructor(binder=null) {
    if (binder) this.binder = binder;
  }
});

module.exports = random;

const compile = require('./compile');
compile('/functions');
compile('/spreads');
