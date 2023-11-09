/*
	# @stews/soup #
	:: created by @paigeroid/@nuttmegg using ::
	- aepl: https://github.com/paigeroid/aepl
  
	## LINKS ##
	- https://github.com/paigeroid/stews/tree/main/src/Soup
	- https://npmjs.com/package/@stews/soup

 	## MAIN ##
	- https://github.com/paigeroid/stews
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
cl.init("Soup", class {
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

	

    // properties
    get properties() {
        let proto = this.constructor.prototype;
        let names = Object.getOwnPropertyNames(proto);
        let info = [];
        let methods = {}

        Object.getOwnPropertyNames(this).forEach( (name) => {
            methods[name] = (Object.getOwnPropertyDescriptors(this)[name].value) ? Object.getOwnPropertyDescriptors(this)[name].value : this[name];
            names.unshift(name);
        });

        Object.getOwnPropertyNames(proto).forEach( (name) => {
            if (Object.getOwnPropertyDescriptors(proto)[name].value) {
                methods[name] = Object.getOwnPropertyDescriptors(proto)[name].value;
            }
            else if (name == "props" || name == "properties") {
                methods[name] = Object.getOwnPropertyDescriptors(proto)[name].get
            }
            else if ( Soup.primaryInfo.includes(name) ) {
                let entries = [];

                Object.entries(methods).forEach( (entry, index) => {
                    if (entry[0] == "constructor") entries.push( [name, this[name]] ); entries.push(entry);
                });

                methods = Object.fromEntries(entries);
            }
            else {
                methods[name] = this[name];
            }
        });

        info = Object.fromEntries(Object.entries(methods).filter( (entry, index) => {
            return Soup.primaryInfo.includes(entry[0]);
        }));

        return {
            names: names,
            descriptors: Object.getOwnPropertyDescriptors(proto),
            methods: methods,
            info: info
        }
    }
    get props() { return this.properties; }
});



// export
module.exports = Soup;



// compilers
const compile = require('./compile');
compile('builders');
compile('functions');
compile('properties');
compile('internals');
