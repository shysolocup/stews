/*
	# @stews/soup #
	 :: Version 1.1.0 | 11/07/23 :: :: created by @paigeroid using ::
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

*/


// imports
const cl = require('aepl');
const fs = require('fs');
const Stew = require('@stews/stew');
const Noodle = require('@stews/noodle');


// constructs
const __form = require('./construct/__form.js');
const __proxy = require('./construct/__proxy');


// main class
cl.init("Soup", class {
    constructor(object, splitter='') {

				
		// formatting construct
		__form(object, splitter);
		

        Object.defineProperty(this, "splitter", {
            value: new String(splitter)
        });

        return new Proxy(this, __proxy());
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


    // toPrimitive
    [Symbol.toPrimitive](hint) {
        if (hint === "string") {
            return this.toString();
        }
        else if (hint == "number") {
            return Number(this.join(""));
        }
        return this;
    }


    // iterator ( for..of )
    [Symbol.iterator]() {
        var stuff = this;
        return {
            current: 0,
            last: stuff.length-1,

            next() {
                if (this.current <= this.last) {
                    let data = (stuff.type == "pair") ? stuff.entries[this.current++] : stuff.get(this.current++);
                    return { done: false, value: data };
                } else {
                    return { done: true };
                }
            }
        };
    }
});



function SoapProxyHandler() { return {

        get(target, prop) {
            if (Object.getOwnPropertyNames(Soup.prototype).includes(prop) || target[prop]) { // if it's a function or main thing
                return target[prop];
            }
            else if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it's a number
                return target.values[Number(prop)];
            }
            else if (typeof prop == "string") { // if it's string
                return target.get(prop);
            }
            else {
                return false;
            }
        },


        set(target, prop, value) {
            if (target[prop]) { // if it's a main thing like insides or type
                target[prop] = value;
            }
            else if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it's a number
                target.set(Number(prop), value);
            }
            else if (typeof prop == "string") { // if it's a string
                target.set(prop, value);
	    }
		return true;
        },
        

        deleteProperty(target, prop) {
            if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it is a number
                if (target.type == "pair") {
                    target.insides = Object.fromEntries(target.entries.filter( (value, index) => {
                        return index != Number(prop);
                    }));
                    return true;
                }
                else if (target.type == "list") {
                    target.insides = target.insides.filter( (value, index) => {
                        return index != Number(prop);
                    });
                    return true;
                }
            }
            else if (typeof prop == "string") { // if it is a string
                if (target.type == "pair") {
                    target.insides = Object.fromEntries(target.entries.filter( (value, index) => {
                        return value[0] != prop;
                    }));
                    return true;
                }
                else if (target.type == "list") {
                    target.insides = target.insides.filter( (value) => {
                        return value != prop;
                    });
                    return true;
                }
            }
            else {
                return false;
            }
        }

    };
}



// functions
Object.defineProperty( Soup, "from", {
    value: (object, splitter='') => { return new Soup(object, splitter); }
});

Object.defineProperty( Soup, "fromEntries", {
	value: (entries) => { return new Soup(Object.fromEntries(entries)); }
});

Object.defineProperty( Soup, "parse", {
	value: (entries) => {
        if (entries.startsWith("{") && entries.endsWith("}")) return new Soup(JSON.parse(entries));
        else if (entries.startsWith("[") && entries.endsWith("]")) return new Soup(new Function(`return ${entries}`)());
    }
});



module.exports = Soup;



// compiling functions
let func_dir = require('./functions/_funkydir');
let functions = fs.readdirSync(func_dir).filter( file => ((file.endsWith('.js') || file.endsWith('.ts')) ));
functions.forEach( (file) => {
	require(`./functions/${file}`);
});



// compiling properties
let prop_dir = require('./properties/_funkydir');
let properties = fs.readdirSync(prop_dir).filter( file => ((file.endsWith('.js') || file.endsWith('.ts')) ));  
properties.forEach( (file) => {
	require(`./properties/${file}`);
});
