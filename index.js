/* :: Stews :: Version 1.2.0 | 03/01/23 :: */

class Soup {
    constructor(object, splitter='') {
        if (object instanceof Function) object = new object();
        if (object instanceof Stew || object instanceof Soup) {
            object = object.insides;
        }
        if (!object) {
            this.insides = [];
            this.type = "array";
        }
        else if (typeof object == "string") {
            if (object.toLowerCase() == "set" || object.toLowerCase() == "array") {
                this.insides = [];
                this.type = "array";
            }
            else if (object.toLowerCase() == "map" || object.toLowerCase() == "object") {
                this.insides = {};
                this.type = "object";
            }
            else {
                this.insides = object.split(splitter);
                this.type = "array";
            }
        }
        else if (object instanceof Array) {
            this.insides = object;
            this.type = "array";
        }
        else if (object instanceof Set) {
            this.insides = Array.from(object);
            this.type = "array";
        }
        else if (object instanceof Map) {
            this.insides = Object.fromEntries(object.entries());
            this.type = "object";
        }
        else if (object instanceof String) {
            this.insides = [];
            this.type = "array";
        }
        else if (object instanceof Object) {
            this.insides = object;
            this.type = "object";
        }
    }


    // delete
    delete(entry) {
        if (typeof entry == "string") {
            if (this.type == "object") delete this.insides[entry];
            else if (this.type == "array") delete this.insides[this.insides.indexOf(entry)];
        }
        else if (typeof entry == "number") {
            if (this.type == "object") delete this.insides[Object.keys(this.insides)[entry]];
            else if (this.type == "array") delete this.insides[entry];
        }
        if (this.type == "array") return this.insides = this.insides.filter( (entry) => { return entry != null; } )
    }
    remove(entry) { return this.delete(entry); }


    // push
    push(entry, value=null) {
        if (this.type == "object") return this.insides[entry] = value;
        else if (this.type == "array") return this.insides.push(entry);
    }
    add(entry) { return this.push(entry); }
    

    // set
    set(entry, set_to=null) {
        if (typeof entry == "string") {
            if (this.type == "object") return this.insides[entry] = set_to;
            else if (this.type == "array") return this.insides[this.insides.indexOf(entry)] = set_to;
        }
        else if (typeof entry == "number") {
            if (this.type == "object") return this.insides[Object.keys(this.insides)[entry]] = set_to;
            else if (this.type == "array") return this.insides[entry] = set_to;
        }
    }


    // pull
    pull(entry, value=null) {
        if (this.type == "object") {
            let thing = Object.entries(this.insides);
            thing.unshift( [entry, value] );
            return this.insides = Object.fromEntries(thing);
        }
        else if (this.type == "array") return this.insides.unshift(entry);
    }
    unshift(entry) { return this.pull(entry); }


    // pop
    pop() {
        if (this.type == "object") {
            let thing = Object.entries(this.insides);
            thing.pop();
            return this.insides = Object.fromEntries(thing);
        }
        else if (this.type == "array") return this.insides.pop();
    }


    // shift
    shift() {
        if (this.type == "object") {
            let thing = Object.entries(this.insides);
            thing.shift();
            return this.insides = Object.fromEntries(thing);
        }
        else if (this.type == "array") return this.insides.shift();
    }


    // list
    list() {
        return Array.from(this.insides);
    }
    toList() { return this.list(); }
    array() { return this.list(); }
    toArray() { return this.list(); }
    arrayify() { return this.list(); }


    // pair
    pair() {
        return Object.fromEntries(Object.entries(this.insides));
    }
    toPair() { return this.pair(); }
    object() { return this.pair(); }
    toObject() { return this.pair(); }
    objectify() { return this.pair(); }


    // stir
    pour() {
        return this.insides;
    }
    merge() { return this.pour(); }
    


    // indexOf
    indexOf(entry) {
        if (this.type == "object") return Object.keys(this.insides).indexOf(entry);
        else if (this.type == "array") return this.insides.indexOf(entry);
    }


    // length
    get length() {
        if (this.type == "object") return Object.keys(this.insides).length;
        else if (this.type == "array") return this.insides.length;
    }
    get size() { return this.length; }


    // fetch
    fetch(entry) {
        if (typeof entry == "string") {
            if (this.type == "object") return this.insides[entry];
            else if (this.type == "array") return this.insides[this.insides.indexOf(entry)];
        }
        else if (typeof entry == "number") {
            if (this.type == "object") return this.insides[Object.keys(this.insides)[entry]];
            else if (this.type == "array") return this.insides[entry];
        }
    }
    get(entry) { return this.fetch(entry); }
    find(entry) { return this.fetch(entry); }


    // forEach
    forEach(func) {
        for (let i = 0; i < this.length; i++) {
            if (this.type == "object") {
                func( Object.keys(this.insides)[i], Object.values(this.insides)[i], i );
            }
            else if (this.type == "array") {
                func( this.insides[i], i );
            }
        }
    }


    // toString
    toString() {
        return this.insides.toString();
    }


    // join
    join(joiner=",") {
        return this.insides.join(joiner);
    }


    // includes
    includes(entry) {
        if (this.type == "object") return Object.keys(this.insides).includes(entry);
        else if (this.type == "array") return this.insides.includes(entry);
    }
    contains(entry) { return this.insides.includes(entry); }
    has(entry) { return this.insides.includes(entry); }

    
    // clear
    clear() {
        if (this.type == "object") return this.insides = {};
        else if (this.type == "array") return this.insides = [];
    }


    // stringify
    stringify(replacer=null, indent=null) {
        return JSON.stringify(this.insides, replacer, indent);
    }


    // parse
    parse(reviver=null) {
        return JSON.parse(this.insides, reviver);
    }


    // filter
    filter(func) {
        if (this.type == "object") {
            let entries = Object.entries(this.insides);
            entries.forEach( (entry, index) => {
                entries[index] = { key: entry[0], value: entry[1], index: index };
            });

            let filt = entries.filter( (stuff) => func(stuff));

            filt.forEach( (entry, index) => {
                filt[index] = [ entry.key, entry.value ];
            })

            return new Soup(Object.fromEntries(filt));
        }
        else if (this.type == "array") {
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
        if (this.type == "object") {
            let thing = Object.entries(this.insides);

            this.forEach( (key, value, index) => {
                thing[index][1] = func(value);
            });
            
            return new Soup(Object.fromEntries(thing));
        }
        else if (this.type == "array") {
            return new Soup( this.insides.map(func) );
        }
    }


    // isList
    isList() {
        return (this.type == "array") ? true : false;
    }
    isArray() { return this.isList(); }
    isSet() { return this.isList(); }
    
    // isPair
    isPair() {
        return this.type == "object" ? true : false;
    }
    isObject() { return this.isPair(); }
    isMap() { return this.isPair(); }


    // swig
    swig(func) {
        if (this.type == "object") {
            for (let i = 0; i < this.length; i++) {
                if (func(this.keys[i], this.values[i], i)) return true;
            }
        }
        else if (this.type == "array") {
            for (let i = 0; i < this.length; i++) {
                if (func(this.insides[i])) return true;
            }
        }

        return false;
    }
    some(func) { return this.swig(func); }


    // slice
    slice(start, end) {
        if (this.type == "object") {
            return new Soup( Object.fromEntries( Object.entries(this.insides).slice(start, end)) );
        }
        else if (this.type == "array") {
            return new Soup(this.insides.slice(start, end));
        }
    }


    // sort
    sort(func=null) {
        if (this.type == "object") {
            let thing = Object.entries(this.insides);
            this.insides = Object.fromEntries( (func) ? thing.sort(func) : thing.sort() );
            return this;
        }
        else if (this.type == "array") {
            this.insides = (func) ? this.insides.sort(func) : this.insides.sort();
            return this;
        }
    }


    // reverse
    reverse() {
        if (this.type == "object") {
            this.insides = Object.fromEntries( Object.entries(this.insides).reverse() );
            return this;
        }
        else if (this.type == "array") {
            this.insides = this.insides.reverse();
            return this;
        }
    }
    flip() { return this.reverse(); }
}

class Stew {
    constructor(object, splitter='') {
        if (object instanceof Function) object = new object();
        if (object instanceof Stew || object instanceof Soup) {
            object = object.insides;
        }
        if (!object) {
            this.insides = new Set();
            this.type = "set";
        }
        else if (typeof object == "string") {
            if (object.toLowerCase() == "set" || object.toLowerCase() == "array") {
                this.insides = new Set();
                this.type = "set";
            }
            else if (object.toLowerCase() == "map" || object.toLowerCase() == "object") {
                this.insides = new Map();
                this.type = "map";
            }
            else {
                this.insides = new Set(object.split(splitter));
                this.type = "set";
            }
        }
        else if (object instanceof Array) {
            this.insides = new Set(object);
            this.type = "set";
        }
        else if (object instanceof Map) {
            this.insides = object;
            this.type = "map";
        }
        else if (object instanceof Set) {
            this.insides = object;
            this.type = "set";
        }
        else if (object instanceof String) {
            this.insides = new Set();
            this.type = "set";
        }
        else if (object instanceof Object) {
            this.insides = new Map(Object.entries(object));
            this.type = "map";
        }
    }
    
    
    // length
    get length() {
        return this.insides.size;
    }
    get size() { return this.length; }
    
    
    // push
    push(variable, value=null) {
        if (this.type == "set") {
            let thing = Array.from(this.insides);
            thing.push(variable);
            this.insides = new Set(thing);
        }
        else if (this.type == "map") {
            let thing = Array.from(this.entries);
            thing.push( [variable, value] );
            this.insides = new Map(thing);
        }
    }


    // add
    add(variable, value=null) {
        if (this.type == "set") return this.insides.add(variable);
        else if (this.type == "map") return this.insides.set(variable, value);
    }

    // set
    set(entry, value=null) { 
        if (typeof entry == "string") {
            if (this.type == "set") {
                let thing = Array.from(this.insides);
                thing[thing.indexOf(entry)] = value;
                return this.insides = new Set(thing);
            }
            else if (this.type == "map") {
                return this.insides.set(entry, value);
            }
        }
        else if (typeof entry == "number") {
            if (this.type == "set") {
                let thing = Array.from(this.insides);
                thing[entry] = value;
                return this.insides = new Set(thing);
            }
            else if (this.type == "map") {
                let thing = Array.from(this.insides.entries());
                thing[entry][1] = value;
                return this.insides = new Map(thing);
            }
        }
    }


    // pull
    pull(variable, value=null) {
        if (this.type == "set") {
            let thing = Array.from(this.insides);
            thing.unshift(variable);
            this.insides = new Set(thing);
        }
        else if (this.type == "map") {
            let thing = Array.from(this.entries);
            thing.unshift( [variable, value] );
            this.insides = new Map(thing);
        }
    }
    unshift(variable, value=null) { return this.pull(variable, value); }
    
    
    // indexOf
    indexOf(name) {
        return Array.from(this.insides.keys()).indexOf(name);
    }
    
    
    // fetch
    fetch(entry) {
        if (this.type == "map") {
            if (typeof entry == "string") {
                return this.insides.get(entry);
            }
            else if (typeof entry == "number") {
                return Array.from(this.insides.values())[entry];
            }
        }
        else if (this.type == "set") {
            if (typeof entry == "string") {
                return Array.from(this.insides.values())[Array.from(this.insides.values()).indexOf(entry)]
            }
            else if (typeof entry == "number") {
                return Array.from(this.insides.values())[entry];
            }
        }
    }
    get(entry) { return this.fetch(entry); }
    find(entry) { return this.fetch(entry); }
    
    
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
        return Array.from(this.insides.entries());
    }
    
    
    // forEach
    forEach(func) {
        for (let i = 0; i < this.insides.size; i++) {
            if (this.type == "map") {
                let key = Array.from(this.insides.keys())[i];
                let value = Array.from(this.insides.values())[i];
                let index = i;
            
                func(key, value, index);
            }
            else if (this.type == "set") {
                let value = Array.from(this.insides)[i];
                let index = i
                func(value, index);
            }
        }
    }
    
    
    // delete
    delete(entry) {
        if (typeof entry == "string") return this.insides.delete(entry);
        else if (typeof entry == "number") return this.insides.delete( Array.from(this.insides.keys())[entry] );
    }
    remove(entry) { return this.delete(entry); }
    
    
    // pop
    pop() {
    	let key = Array.from(this.insides.keys())[this.insides.size-1];
    	this.insides.delete(key);
    	return key;
    }
    
    
    // shift
    shift() {
        let key = Array.from(this.insides.keys())[0];
        this.insides.delete(key);
        return key;
    }
    
    
    // list
    list() {
        return Array.from(this.insides);
    }
    toList() { return this.list(); }
    array() { return this.list(); }
    toArray() { return this.list(); }
    arrayify() { return this.list(); }
    
    
    // pair
    pair() {
        return Object.fromEntries(Array.from(this.insides));
    }
    toPair() { return this.pair(); }
    object() { return this.pair(); }
    toObject() { return this.pair(); }
    objectify() { return this.pair(); }

    
    // pour
    pour() {
        if (this.type == "map") return Object.fromEntries(Array.from(this.insides));
        else if (this.type == "set") return Array.from(this.insides);
    }
    merge() { return this.pour(); }
    
    
    // join
    joinKeys(joiner=",") {
    	return Array.from(this.insides.keys()).join(joiner);
    }
    join(joiner=",") { return this.joinKeys(joiner); }
    
    joinValues(joiner=",") {
    	return Array.from(this.insides.values()).join(joiner);
    }
    
    
    // stringify
    stringify(replacer=null, indent=null) {
        return JSON.stringify(Object.fromEntries(Array.from(this.insides)), replacer, indent);
    }
    
    // parse
    parse(reviver=null) {
        return JSON.parse(Object.fromEntries(Array.from(this.insides)), reviver);
    }
    
    
    // toString
    toString() {
        return Array.from(this.insides).toString();
    }
    
    
    // includes
    includes(key) {
        return this.insides.has(key);
    }
    contains(key) { return this.includes(key); }
    has(key) { return this.includes(key); }
    
    
    // clear
    clear() {
        return this.insides.clear();
    }


    // filter
    filter(func) {
        if (this.type == "map") {
            let entries = Array.from(this.insides.entries());
            entries.forEach( (entry, index) => {
                entries[index] = { key: entry[0], value: entry[1], index: index };
            });

            let filt = entries.filter( (stuff) => func(stuff));

            filt.forEach( (entry, index) => {
                filt[index] = [ entry.key, entry.value ];
            })

            return new Stew(new Map(filt));
        }
        else if (this.type == "set") {
            return new Stew(Array.from(this.insides).filter( (stuff, index) => func(stuff, index)));
        }
    }


    // map
    map(func) {
        if (this.type == "map") {
            let thing = Array.from(this.insides.entries());

            this.forEach( (key, value, index) => {
                thing[index][1] = func(value);
            });
            
            return new Stew( Object.fromEntries(thing) );
        }
        else if (this.type == "set") {
            return new Stew( Array.from(this.insides).map(func) );
        }
    }


    // swig
    swig(func) {
        if (this.type == "map") {
            for (let i = 0; i < this.length; i++) {
                if (func(this.keys[i], this.values[i], i)) return true;
            }
        }
        else if (this.type == "set") {
            for (let i = 0; i < this.length; i++) {
                if (func(Array.from(this.insides)[i])) return true;
            }
        }

        return false;
    }
    some(func) { return this.swig(func); }


    // isList
    isList() {
        return (this.type == "set") ? true : false;
    }
    isArray() { return this.isList(); }
    isSet() { return this.isList(); }
    
    // isPair
    isPair() {
        return this.type == "map" ? true : false;
    }
    isObject() { return this.isPair(); }
    isMap() { return this.isPair(); }


    // slice
    slice(start, end) {
        if (this.type == "map") {
            return new Stew( Object.fromEntries( this.entries.slice(start, end)) );
        }
        else if (this.type == "set") {
            return new Stew(Array.from(this.insides).slice(start, end));
        }
    }


    // sort
    sort(func=null) {
        if (this.type == "map") {
            let thing = Array.from(this.insides.entries());
            this.insides = new Map( (func) ? thing.sort(func) : thing.sort() );
            return this;
        }
        else if (this.type == "set") {
            this.insides = new Set( (func) ? Array.from(this.insides).sort(func) : Array.from(this.insides).sort() );
            return this;
        }
    }


    // reverse
    reverse() {
        if (this.type == "object") {
            this.insides = Object.fromEntries( Object.entries(this.insides).reverse() );
            return this;
        }
        else if (this.type == "array") {
            return this.insides = this.insides.reverse();
            return this;
        }
    }
    flip() { return this.reverse(); }
}

Object.defineProperty( Soup, "from", {
    value: (soup, splitter='') => {
        return new Soup(soup, splitter);
    }
});

Object.defineProperty( Stew, "from", {
    value: (stew, splitter='') => {
        return new Stew(stew, splitter);
    }
});

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
