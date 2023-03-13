/* :: Stews :: Version 1.3.2 | 03/13/23 :: */

class Stew {
    constructor(object, splitter='') {
        if (object instanceof Function) object = new object();
        if (object instanceof Stew || object instanceof Soup) {
            object = object.insides;
        }
        if (!object) {
            this.insides = new Set();
            this.type = "list";
        }
        else if (typeof object == "string") {
            if (object.toLowerCase() == "set" || object.toLowerCase() == "array" || object.toLowerCase() == "list") {
                this.insides = new Set();
                this.type = "list";
            }
            else if (object.toLowerCase() == "map" || object.toLowerCase() == "object" || object.toLowerCase() == "pair") {
                this.insides = new Map();
                this.type = "pair";
            }
            else {
                this.insides = new Set(object.split(splitter));
                this.type = "list";
            }
        }
        else if (object instanceof Array) {
            this.insides = new Set(object);
            this.type = "list";
        }
        else if (object instanceof Set) {
            this.insides = object;
            this.type = "list";
        }
        else if (object instanceof Map) {
            this.insides = object
            this.type = "pair";
        }
        else if (object instanceof String) {
            this.insides = new Set();
            this.type = "list";
        }
        else if (object instanceof Object) {
            this.insides = new Map(Object.entries(object));
            this.type = "pair";
        }

        return new Proxy(this, StewProxyHandler());
    }


    // delete
    delete(entry) {
        var returns;
        if (this.type == "pair") {
            if (typeof entry == "number") returns = { key: this.keys[entry], value: this.values[entry], index: entry};
            else if (typeof entry == "string") returns = { key: this.keys[this.indexOf(entry)], value: this.values[this.indexOf(entry)], index: this.indexOf(entry)};
        }
        else if (this.type == "list") {
            if (typeof entry == "number") returns = { value: this.values[entry], index: entry};
            else if (typeof entry == "string") returns = { value: this.values[this.indexOf(entry)], index: this.indexOf(entry)};
        }
        delete this[entry];
        return returns;
    }
    remove(entry) { return this.delete(entry); }


    // push
    push(entry, value=null) {
        if (this.type == "pair") {
            let thing = Array.from(this.insides.entries());
            thing.push([entry, value]);
            this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing.push(entry);
            this.insides = new Set(thing);
        }
    }
    add(entry, value=null) { return this.push(entry, value); }
    

    // set
    set(entry, set_to=null) {
        if (typeof entry == "string") {
            if (this.type == "pair") {
                return this.insides.set(entry, set_to);
            }
            else if (this.type == "list") {
                let thing = Array.from(this.insides);
                thing[thing.indexOf(entry)] = set_to;
                return this.insides = new Set(thing);
            }
        }
        else if (typeof entry == "number") {
            if (this.type == "pair") {
                return this.insides.set(this.keys[entry], set_to);
            }
            else if (this.type == "list") {
                let thing = Array.from(this.insides);
                thing[entry] = set_to;
                return this.insides = new Set(thing);
            }
        }
    }


    // pull
    pull(entry, value=null) {
        if (this.type == "pair") {
            let thing = Array.from(this.insides.entries());
            thing.unshift([entry, value]);
            this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing.unshift(entry);
            this.insides = new Set(thing);
        }
    }
    unshift(entry) { return this.pull(entry); }


    // pop
    pop() {
        let returns = (this.type == "pair") ? {key: this.keys[this.length-1], value: this.values[this.length-1], index: this.length-1} : {value: this.entries[this.length-1][1], index: this.length-1};
        delete this[this.length-1];
        return returns;
    }
    unpush() { return this.pop(); }


    // shift
    shift() {
        let returns = (this.type == "pair") ? {key: this.keys[0], value: this.values[0], index: this.length-1} : {value: this.entries[0][1], index: 0};
        delete this[0];
        return returns;
    }
    unpull() { return this.shift(); }


    // pour
    pour(type=null, joiner='') {
        if (type instanceof Function) type = new type();

        if (type instanceof Array || (typeof type == "string" && type.toLowerCase() == 'array') || (type == null && this.type == "list"))
            return (this.type=="pair") ? Array.from(this.insides.entries())
            : Array.from(this.insides);

        else if (type instanceof Set || (typeof type == "string" && type.toLowerCase() == 'set'))
            return new Set(
                (this.type=="pair") ? Array.from(this.insides.entries())
                : Array.from(this.insides)
            );
        
        else if (type instanceof Map || (typeof type == "string" && type.toLowerCase() == 'map'))
            return new Map(
                Array.from(this.entries)
            );

        else if (type instanceof Stew || (typeof type == "string" && type.toLowerCase() == 'stew')) return new Stew(this.insides);
        else if (type instanceof Soup || (typeof type == "string" && type.toLowerCase() == 'soup')) return new Soup(this.insides);

        else if (type instanceof String || (typeof type == "string" && type.toLowerCase() == 'string'))
            return (this.type=="pair") ? Array.from(this.insides.keys()).join(joiner) : Array.from(this.insides).join(joiner);

        else if (type instanceof Object || (typeof type == "string" && type.toLowerCase() == 'object') || (type == null && this.type == "pair"))
            return Object.fromEntries(
                this.entries
            );
    }
    merge(type=null, joiner='') { return this.pour(type, joiner); }
    fix(type=null, joiner='') { return this.pour(type, joiner); }


    // keyOf
    keyOf(entry) {
        if (this.type == "pair") return Array.from(this.insides.keys())[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return Array.from(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }

    // keyOf
    valueOf(entry) {
        if (this.type == "pair") return Array.from(this.insides.values())[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return Array.from(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }

    // indexOf
    indexOf(entry) {
        if (this.type == "pair") return Array.from(this.insides.keys()).indexOf(entry);
        else if (this.type == "list") return Array.from(this.insides).indexOf(entry);
    }

    // entryOf
    entryOf(entry) {
        return Array.from(this.entries)[ (typeof entry == "string") ? this.indexOf(entry) : entry];
    }


    // length
    get length() {
        return Array.from(this.insides.keys()).length;
    }
    get size() { return this.length; }


    // get
    get(entry) {
        if (typeof entry == "string") {
            if (this.type == "pair") return this.insides.get(entry);
            else if (this.type == "list") return Array.from(this.insides)[this.indexOf(entry)];
        }
        else if (typeof entry == "number") {
            if (this.type == "pair") return this.insides.get(this.keys[entry]);
            else if (this.type == "list") return Array.from(this.insides)[entry];
        }
    }
    fetch(entry) { return this.get(entry); }
    find(entry) { return this.get(entry); }


    // forEach
    forEach(func) {
        for (let i = 0; i < this.length; i++) {
            if (this.type == "pair") {
                func( this.keys[i], this.values[i], i );
            }
            else if (this.type == "list") {
                func( Array.from(this.insides)[i], i );
            }
        }
    }


    // toString
    toString() {
        return Array.from(this.insides).toString();
    }


    // join
    join(joiner=",") {
        return (this.type == "list") ? Array.from(this.insides).join(joiner) : Array.from(this.insides.keys()).join(joiner);
    }

    joinKeys(joiner=",") {
        return (this.type == "list") ? Array.from(this.insides).join(joiner) : Array.from(this.insides.keys()).join(joiner);
    }

    joinValues(joiner=",") {
        return (this.type == "list") ? Array.from(this.insides).join(joiner) : Array.from(this.insides.values()).join(joiner);
    }


    // includes
    includes(entry) {
        if (this.type == "pair") return Array.from(this.insides.keys()).includes(entry);
        else if (this.type == "list") return Array.from(this.insides).includes(entry);
    }
    contains(entry) { return this.includes(entry); }
    has(entry) { return this.includes(entry); }

    
    // clear
    clear() {
        return this.insides = (this.type=="pair") ? new Map() : new Set();
    }


    // stringify
    stringify(replacer=null, indent=null) {
        if (this.type == "list") {
            if (indent) {
                let thing = JSON.stringify({ insides: Array.from(this.insides) }, replacer, indent);
                thing = thing.split('"insides": ');
                thing.shift();
                thing = thing.join("").split("");
                thing.pop();

                let start = thing.slice(0, thing.length-6);
                let end = thing.slice(thing.length-2, thing.length-1);
                start.push(end.join(""));

                thing = start;
                return thing.join("");
            } else return `[${this.toString()}]`;
        }
        else return JSON.stringify(Object.fromEntries(Array.from(this.insides.entries())), replacer, indent);
    }


    // filter
    filter(func) {
        if (this.type == "pair") {
            let entries = Array.from(this.insides.entries());
            entries.forEach( (entry, index) => {
                entries[index] = { key: entry[0], value: entry[1], index: index };
            });

            let filt = entries.filter( (stuff) => func(stuff.key, stuff.value, stuff.index));

            filt.forEach( (entry, index) => {
                filt[index] = [ entry.key, entry.value ];
            });

            return new Stew(Object.fromEntries(filt));
        }
        else if (this.type == "list") {
            return new Stew(Array.from(this.insides).filter( (stuff, index) => func(stuff, index)));
        }
    }


    // keys
    get keys() {
        return Array.from(this.insides.keys());
    }
    // values
    get values() {
        return Array.from(this.insides.values());
    }
    // entries
    get entries() {
        if (this.type == "pair") return Array.from(this.insides.entries());
        else if (this.type == "list") {
            let thing = Array.from(this.insides.entries());
            thing.forEach( (value, index) => {
                thing[index][0] = index.toString();
            });
            return thing;
        }
    }


    // map
    map(func) {
        if (this.type == "pair") {
            let thing = Array.from(this.insides.entries());

            this.forEach( (key, value, index) => {
                thing[index][1] = func(key, value, index);
            });
            
            return new Stew(Object.fromEntries(thing));
        }
        else if (this.type == "list") {
            return new Stew( Array.from(this.insides).map(func) );
        }
    }


    // isList
    isList() {
        return (this.type == "list") ? true : false;
    }
    isArray() { return this.isList(); }
    isSet() { return this.isList(); }
    
    // isPair
    isPair() {
        return this.type == "pair" ? true : false;
    }
    isObject() { return this.isPair(); }
    isMap() { return this.isPair(); }

    // isStew
    isStew() { return true; }

    // isSoup
    isSoup() { return false; }


    // swig
    swig(func) {
        if (this.type == "pair") {
            for (let i = 0; i < this.length; i++) {
                if (func(this.keys[i], this.values[i], i)) return true;
            }
        }
        else if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (func(Array.from(this.insides)[i], i)) return true;
            }
        }

        return false;
    }
    some(func) { return this.swig(func); }


    // slice
    slice(start, end) {
        if (this.type == "pair") {
            return new Stew( Object.fromEntries( Array.from(this.insides.entries()).slice(start, end)) );
        }
        else if (this.type == "list") {
            return new Stew(Array.from(this.insides).slice(start, end));
        }
    }


    // sort
    sort(func=null) {
        if (this.type == "pair") {
            let thing = Array.from(this.insides.entries());
            this.insides = new Map( (func) ? thing.sort(func) : thing.sort() );
            return this;
        }
        else if (this.type == "list") {
            this.insides = new Set((func) ? Array.from(this.insides).sort(func) : Array.from(this.insides).sort());
            return this;
        }
    }


    // reverse
    reverse() {
        if (this.type == "pair") {
            this.insides = new Map( Array.from(this.insides.entries()).reverse() );
            return this;
        }
        else if (this.type == "list") {
            this.insides = new Set( Array.from(this.insides).reverse() );
            return this;
        }
    }
    flip() { return this.reverse(); }


    // front
    front() {
        let entry = this.entries[0];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: 0} : entry[1];
    }
    first() { return this.front(); }


    // back
    back() {
        let entry = this.entries[this.length-1];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: this.length-1} : entry[1];
    }
    last() { return this.back(); }


    // rename
    rename(entry, name) {
        if (this.type == "pair") {
            let thing = Array.from(this.insides.entries());
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry][0] = name;
            return this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry] = name;
            return this.insides = new Set(thing);
        }
    }
}

function StewProxyHandler() { return {

        get(target, prop) {
            if (Object.getOwnPropertyNames(Stew.prototype).includes(prop) || target[prop]) { // if it's a function or main thing
                return target[prop];
            }
            else if (Number(prop)+1) { // if it's a number
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
                return target[prop] = value;
            }
            else if (Number(prop)+1) { // if it's a number
                return target.set(Number(prop), value);
            }
            else if (typeof prop == "string") { // if it's a string
                return target.set(prop, value);
            }
            else {
                return false;
            }
        },
        

        deleteProperty(target, prop) {
            if (Number(prop)+1) { // if it is a number
                target.insides.delete(target.keys[Number(prop)]);
                return true;
            }
            else if (typeof prop == "string") { // if it is a string
                target.insides.delete(prop);
                return true;
            }
            else {
                return false;
            }
        }

    };
}


class Soup {
    constructor(object, splitter='') {
        if (object instanceof Function) object = new object();
        if (object instanceof Stew || object instanceof Soup) {
            object = object.insides;
        }
        if (!object) {
            this.insides = [];
            this.type = "list";
        }
        else if (typeof object == "string") {
            if (object.toLowerCase() == "set" || object.toLowerCase() == "array" || object.toLowerCase() == "list") {
                this.insides = [];
                this.type = "list";
            }
            else if (object.toLowerCase() == "map" || object.toLowerCase() == "object" || object.toLowerCase() == "pair") {
                this.insides = {};
                this.type = "pair";
            }
            else {
                this.insides = object.split(splitter);
                this.type = "list";
            }
        }
        else if (object instanceof Array) {
            this.insides = object;
            this.type = "list";
        }
        else if (object instanceof Set) {
            this.insides = Array.from(object);
            this.type = "list";
        }
        else if (object instanceof Map) {
            this.insides = Object.fromEntries(object.entries());
            this.type = "pair";
        }
        else if (object instanceof String) {
            this.insides = [];
            this.type = "list";
        }
        else if (object instanceof Object) {
            this.insides = object;
            this.type = "pair";
        }

        return new Proxy(this, SoapProxyHandler());
    }


    // delete
    delete(entry) {
        var returns;
        if (this.type == "pair") {
            if (typeof entry == "number") returns = { key: this.keys[entry], value: this.values[entry], index: entry};
            else if (typeof entry == "string") returns = { key: this.keys[this.indexOf(entry)], value: this.values[this.indexOf(entry)], index: this.indexOf(entry)};
        }
        else if (this.type == "list") {
            if (typeof entry == "number") returns = { value: this.values[entry], index: entry};
            else if (typeof entry == "string") returns = { value: this.values[this.indexOf(entry)], index: this.indexOf(entry)};
        }
        delete this[entry];
        return returns;
    }
    remove(entry) { return this.delete(entry); }


    // push
    push(entry, value=null) {
        if (this.type == "pair") {
            this.insides[entry] = value;
        }
        else if (this.type == "list") return this.insides.push(entry);
    }
    add(entry, value=null) { return this.push(entry, value); }
    

    // set
    set(entry, set_to=null) {
        if (typeof entry == "string") {
            if (this.type == "pair") {
                this.insides[entry] = set_to;
            }
            else if (this.type == "list") return this.insides[this.insides.indexOf(entry)] = set_to;
        }
        else if (typeof entry == "number") {
            if (this.type == "pair") {
                this.insides[Object.keys(this.insides)[entry]] = set_to;
            }
            else if (this.type == "list") return this.insides[entry] = set_to;
        }
    }


    // pull
    pull(entry, value=null) {
        if (this.type == "pair") {
            let thing = Object.entries(this.insides);
            thing.unshift( [entry, value] );
            this.insides = Object.fromEntries(thing);
        }
        else if (this.type == "list") return this.insides.unshift(entry);
    }
    unshift(entry) { return this.pull(entry); }


    // pop
    pop() {
        let returns = (this.type == "pair") ? {key: this.keys[this.length-1], value: this.values[this.length-1], index: this.length-1} : {value: this.entries[this.length-1][1], index: this.length-1};
        delete this[this.length-1];
        return returns;
    }
    unpush() { return this.pop(); }


    // shift
    shift() {
        let returns = (this.type == "pair") ? {key: this.keys[0], value: this.values[0], index: this.length-1} : {value: this.entries[0][1], index: 0};
        delete this[0];
        return returns;
    }
    unpull() { return this.shift(); }


    // pour
    pour(type=null, joiner='') {
        if (type instanceof Function) type = new type();

        if (type instanceof Array || (typeof type == "string" && type.toLowerCase() == 'array') || (type == null && this.type == "list"))
            return (this.type=="pair") ? Object.entries(this.insides)
            : Array.from(this.insides);

        else if (type instanceof Set || (typeof type == "string" && type.toLowerCase() == 'set'))
            return new Set(
                (this.type=="pair") ? Object.entries(this.insides)
                : this.insides
            );
        
        else if (type instanceof Map || (typeof type == "string" && type.toLowerCase() == 'map'))
            return new Map(
                (this.type=="pair") ? Object.entries(this.insides) : this.insides
            );

        else if (type instanceof Stew || (typeof type == "string" && type.toLowerCase() == 'stew')) return new Stew(this.insides);
        else if (type instanceof Soup || (typeof type == "string" && type.toLowerCase() == 'soup')) return new Soup(this.insides);

        else if (type instanceof String || (typeof type == "string" && type.toLowerCase() == 'string'))
            return (this.type=="pair") ? Object.keys(this.insides).join(joiner) : this.insides.join(joiner);

        else if (type instanceof Object || (typeof type == "string" && type.toLowerCase() == 'object') || (type == null && this.type == "pair"))
            return Object.fromEntries(
                (this.type=="pair") ? Object.entries(this.insides)
                : this.insides
            );
    }
    merge(type=null, joiner='') { return this.pour(type, joiner); }
    fix(type=null, joiner='') { return this.pour(type, joiner); }


    // keyOf
    keyOf(entry) {
        if (this.type == "pair") return Object.keys(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return this.insides[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }

    // keyOf
    valueOf(entry) {
        if (this.type == "pair") return Object.values(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return this.insides[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }

    // indexOf
    indexOf(entry) {
        if (this.type == "pair") return Object.keys(this.insides).indexOf(entry);
        else if (this.type == "list") return this.insides.indexOf(entry);
    }

    // entryOf
    entryOf(entry) {
        if (this.type == "pair") return Object.entries(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return this.entries[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // length
    get length() {
        if (this.type == "pair") return Object.keys(this.insides).length;
        else if (this.type == "list") return this.insides.length;
    }
    get size() { return this.length; }


    // get
    get(entry) {
        if (typeof entry == "string") {
            if (this.type == "pair") return this.insides[entry];
            else if (this.type == "list") return this.insides[this.insides.indexOf(entry)];
        }
        else if (typeof entry == "number") {
            if (this.type == "pair") return this.insides[Object.keys(this.insides)[entry]];
            else if (this.type == "list") return this.insides[entry];
        }
    }
    fetch(entry) { return this.get(entry); }
    find(entry) { return this.get(entry); }


    // forEach
    forEach(func) {
        for (let i = 0; i < this.length; i++) {
            if (this.type == "pair") {
                func( this.keys[i], this.values[i], i );
            }
            else if (this.type == "list") {
                func( this.insides[i], i );
            }
        }
    }


    // toString
    toString() {
        return (this.type == "pair") ? Object.entries(this.insides).toString() : this.insides.toString();
    }


    // join
    join(joiner=",") {
        return (this.type == "list") ? this.insides.join(joiner) : Object.keys(this.insides).join(joiner);
    }

    joinKeys(joiner=",") {
        return (this.type == "list") ? this.insides.join(joiner) : Object.keys(this.insides).join(joiner);
    }

    joinValues(joiner=",") {
        return (this.type == "list") ? this.insides.join(joiner) : Object.values(this.insides).join(joiner);
    }


    // includes
    includes(entry) {
        if (this.type == "pair") return Object.keys(this.insides).includes(entry);
        else if (this.type == "list") return this.insides.includes(entry);
    }
    contains(entry) { return this.includes(entry); }
    has(entry) { return this.includes(entry); }

    
    // clear
    clear() {
        return this.insides = (this.type=="pair") ? {} : [];
    }


    // stringify
    stringify(replacer=null, indent=null) {
        if (this.type == "list") {
            if (indent) {
                let thing = JSON.stringify({ insides: this.insides }, replacer, indent);
                thing = thing.split('"insides": ');
                thing.shift();
                thing = thing.join("").split("");
                thing.pop();

                let start = thing.slice(0, thing.length-6);
                let end = thing.slice(thing.length-2, thing.length-1);
                start.push(end.join(""));

                thing = start;
                return thing.join("");
            } else return `[${this.toString()}]`;
        }
        else return JSON.stringify(this.insides, replacer, indent);
    }


    // filter
    filter(func) {
        if (this.type == "pair") {
            let entries = Object.entries(this.insides);
            entries.forEach( (entry, index) => {
                entries[index] = { key: entry[0], value: entry[1], index: index };
            });

            let filt = entries.filter( (stuff) => func(stuff.key, stuff.value, stuff.index));

            filt.forEach( (entry, index) => {
                filt[index] = [ entry.key, entry.value ];
            });

            return new Soup(Object.fromEntries(filt));
        }
        else if (this.type == "list") {
            return new Soup(this.insides.filter( (stuff, index) => func(stuff, index)));
        }
    }


    // keys
    get keys() {
        return Object.keys(this.insides);
    }
    // values
    get values() {
        return Object.values(this.insides);
    }
    // entries
    get entries() {
        return Object.entries(this.insides);
    }


    // map
    map(func) {
        if (this.type == "pair") {
            let thing = Object.entries(this.insides);

            this.forEach( (key, value, index) => {
                thing[index][1] = func(key, value, index);
            });
            
            return new Soup(Object.fromEntries(thing));
        }
        else if (this.type == "list") {
            return new Soup( this.insides.map(func) );
        }
    }


    // isList
    isList() {
        return (this.type == "list") ? true : false;
    }
    isArray() { return this.isList(); }
    isSet() { return this.isList(); }
    
    // isPair
    isPair() {
        return this.type == "pair" ? true : false;
    }
    isObject() { return this.isPair(); }
    isMap() { return this.isPair(); }

    // isStew
    isStew() { return false; }

    // isSoup
    isSoup() { return true; }


    // swig
    swig(func) {
        if (this.type == "pair") {
            for (let i = 0; i < this.length; i++) {
                if (func(this.keys[i], this.values[i], i)) return true;
            }
        }
        else if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (func(this.insides[i], i)) return true;
            }
        }

        return false;
    }
    some(func) { return this.swig(func); }


    // slice
    slice(start, end) {
        if (this.type == "pair") {
            return new Soup( Object.fromEntries( Object.entries(this.insides).slice(start, end)) );
        }
        else if (this.type == "list") {
            return new Soup(this.insides.slice(start, end));
        }
    }


    // sort
    sort(func=null) {
        if (this.type == "pair") {
            let thing = Object.entries(this.insides);
            this.insides = Object.fromEntries( (func) ? thing.sort(func) : thing.sort() );
            return this;
        }
        else if (this.type == "list") {
            this.insides = (func) ? this.insides.sort(func) : this.insides.sort();
            return this;
        }
    }


    // reverse
    reverse() {
        if (this.type == "pair") {
            this.insides = Object.fromEntries( Object.entries(this.insides).reverse() );
            return this;
        }
        else if (this.type == "list") {
            this.insides = this.insides.reverse();
            return this;
        }
    }
    flip() { return this.reverse(); }


    // front
    front() {
        let entry = this.entries[0];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: 0} : entry[1];
    }
    first() { return this.front(); }


    // back
    back() {
        let entry = this.entries[this.length-1];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: this.length-1} : entry[1];
    }
    last() { return this.back(); }


    // rename
    rename(entry, name) {
        if (this.type == "pair") {
            let thing = Object.entries(this.insides);
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry][0] = name;
            return this.insides = Object.fromEntries(thing);
        }
        else if (this.type == "list") {
            return this.insides[(typeof entry == "string") ? this.indexOf(entry) : entry] = name;
        }
    }
}

function SoapProxyHandler() { return {

        get(target, prop) {
            if (Object.getOwnPropertyNames(Soup.prototype).includes(prop) || target[prop]) { // if it's a function or main thing
                return target[prop];
            }
            else if (Number(prop)+1) { // if it's a number
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
                return target[prop] = value;
            }
            else if (Number(prop)+1) { // if it's a number
                return target.set(Number(prop), value);
            }
            else if (typeof prop == "string") { // if it's a string
                return target.set(prop, value);
            }
            else {
                return false;
            }
        },
        

        deleteProperty(target, prop) {
            if (Number(prop)+1) { // if it is a number
                if (target.type == "pair") {
                    delete target.insides[target.keys[Number(prop)]];
                    return true;
                }
                else if (target.type == "list") {
                    delete target.insides[Number(prop)];
                    target.insides = target.insides.filter( (value) => {
                        return value != null;
                    });
                    return true;
                }
            }
            else if (typeof prop == "string") { // if it is a string
                if (target.type == "pair") {
                    delete target.insides[prop];
                    return true;
                }
                else if (target.type == "list") {
                    delete target.insides[target.indexOf(prop)];
                    target.insides = target.insides.filter( (value) => {
                        return value != null;
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


// from
Object.defineProperty( Soup, "from", {
    value: (object, splitter='') => {
        return new Soup(object, splitter);
    }
});

Object.defineProperty( Stew, "from", {
    value: (object, splitter='') => {
        return new Stew(object, splitter);
    }
});


// brew
String.prototype.brew = function(type=Soup, splitter='') {
    if (type instanceof Function) type = new type();
    return (type instanceof Soup) ? new Soup(this.split(splitter)) : new Stew(this.split(splitter))
}

Array.prototype.brew = function(type=Soup) {
    if (type instanceof Function) type = new type();
    return (type instanceof Soup) ? new Soup(this) : new Stew(this);
}

Object.prototype.brew = function(type=Soup) {
    if (type instanceof Function) type = new type();
    return (type instanceof Soup) ? new Soup(this) : new Stew(this);
}


module.exports = { Stew, Soup };
