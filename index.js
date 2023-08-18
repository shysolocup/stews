/* :: Stews :: Version 1.7.0 | 08/18/23 :: */
// https://github.com/paigeroid/stews


class Stew {
    constructor(object, splitter='') {
        if (object instanceof Function) object = new object();
        if (object instanceof Stew || object instanceof Soup) {
            object = object.insides;
        }
		if (object instanceof Noodle) {
			object = object.content;
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
        else if (typeof object == "number") {
            object = object.toString().split("").map( (value) => { return Number(value) } );
            this.insides = new Set(object);
            this.type = "list";
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

        Object.defineProperty(this, "splitter", {
            value: new String(splitter)
        });

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
    del(entry) { return this.delete(entry); }
    remove(entry) { return this.delete(entry); }
    rem(entry) { return this.delete(entry); }


    // push
    push(entry, value=null) {
        if (this.type == "pair") {
            let thing = this.entries;
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
    push_back(entry, value=null) { return this.push(entry, value); }
    

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
    edit(entry, set_to=null) { return this.set(entry, set_to) };


    // pull
    pull(entry, value=null) {
        if (this.type == "pair") {
            let thing = this.entries;
            thing.unshift([entry, value]);
            this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing.unshift(entry);
            this.insides = new Set(thing);
        }
    }
    unshift(entry, value=null) { return this.pull(entry, value); }
    push_front(entry, value=null) { return this.pull(entry, value); }


    // pop
    pop(offset=0) {
        let index = (this.length-1)-offset;
        let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
        delete this[index];
        return returns;
    }
    unpush(offset=0) { return this.pop(offset); }


    // shift
    shift(offset=0) {
        let index = 0+offset;
        let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
        delete this[index];
        return returns;
    }
    unpull(offset=0) { return this.shift(offset); }


    // pour
    pour(type=null, joiner='') {
        if (type instanceof Function) type = new type();

        if (typeof type == "string" && (type.toLowerCase() == "def" || type.toLowerCase() == "default")) return this.insides;

        if (type instanceof Array || (typeof type == "string" && type.toLowerCase() == 'array') || (type == null && this.type == "list"))
            return (this.type=="pair") ? this.entries
            : Array.from(this.insides);

        else if (type instanceof Set || (typeof type == "string" && type.toLowerCase() == 'set'))
            return new Set(
                (this.type=="pair") ? this.entries
                : Array.from(this.insides)
            );
        
        else if (type instanceof Map || (typeof type == "string" && type.toLowerCase() == 'map'))
            return new Map(
                Array.from(this.entries)
            );

        else if (type instanceof Stew || (typeof type == "string" && type.toLowerCase() == 'stew')) return new Stew(this.insides);
        else if (type instanceof Soup || (typeof type == "string" && type.toLowerCase() == 'soup')) return new Soup(this.insides);

        else if (type instanceof String || (typeof type == "string" && type.toLowerCase() == 'string'))
            return (this.type=="pair") ? this.keys.join(joiner) : Array.from(this.insides).join(joiner);

        else if (type instanceof Object || (typeof type == "string" && type.toLowerCase() == 'object') || (type == null && this.type == "pair"))
            return Object.fromEntries(
                this.entries
            );
    }
    fix(type=null, joiner='') { return this.pour(type, joiner); }
    to(type=null, joiner='') { return this.pour(type, joiner); }


    // keyOf
    keyOf(entry) {
        if (this.type == "pair") {
            if (typeof entry == "string" && this.hasValue(entry)) return this.keys[this.values.indexOf(entry)];
            else return this.keys[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        }
        else if (this.type == "list") return Array.from(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // valueOf
    valueOf(entry) {
        if (this.type == "pair") return this.values[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return Array.from(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // indexOf
    indexOf(entry, exact=true) {
        let stuff = this.find(entry, exact);
        return stuff[0];
    }
    indexOfKey(entry, exact=true) { return this.indexOf(entry, exact); }
    firstIndexOf(entry, exact=true) { return this.indexOf(entry, exact); }
    findFirst(entry, exact=true) { return this.indexOf(entry, exact); }
    

    // indexOfValue
    indexOfValue(entry) {
        if (this.type == "pair") return this.values.indexOf(entry);
        else if (this.type == "list") return Array.from(this.insides).indexOf(entry);
    }


    // entryOf
    entryOf(entry) {
        return this.entries[ (typeof entry == "string") ? this.indexOf(entry) : entry];
    }


    // length
    get length() {
        return this.keys.length;
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
    at(entry) { return this.get(entry); }


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
        return (this.type == "list") ? Array.from(this.insides).join(joiner) : this.keys.join(joiner);
    }
    joinKeys(joiner=",") { return this.join(joiner); }


    // joinValues
    joinValues(joiner=",") {
        return (this.type == "list") ? Array.from(this.insides).join(joiner) : this.values.join(joiner);
    }


    // includes
    includes(/**/) {
        let args = Array.from(arguments);

        if (args.length == 1 && typeof args[0] != "object") {
            var entry = args[0];

            if (this.type == "pair") return this.keys.includes(entry);
            else if (this.type == "list") return Array.from(this.insides).includes(entry);
        }
        else {
            if (args[0] instanceof Array) args = args[0];
            for (let i = 0; i < args.length; i++) {
			    if (this.includes(args[i])) return true;
		    }
		    return false;
        }
    }
    contains(/**/) { return this.includes(...Array.from(arguments)); }
    has(/**/) { return this.includes(...Array.from(arguments)); }

    
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
        else return JSON.stringify(Object.fromEntries(this.entries), replacer, indent);
    }


    // filter
    filter(func) {
        if (this.type == "pair") {
            let entries = this.entries;
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
        return (this.type == "pair") ? Array.from(this.insides.keys()) : this.entries.map( (entry) => { return entry[0] } );
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
            let thing = this.entries;

            this.forEach( (key, value, index) => {
                thing[index][1] = func(key, value, index);
            });
            
            return new Stew(new Map(thing));
        }
        else if (this.type == "list") {
            let thing = Array.from(this.copy().insides);
            this.forEach( (value, index) => {
                thing[index] = func(value, index);
            });

            return new Stew(new Set(thing));
        }
    }
    mapValue(func) { return this.map(func); }


    // mapKey
    mapKey(func) {
        if (this.type == "pair") {
            let thing = this.copy();

            this.forEach( (key, value, index) => {
                thing.rename(index, func(key, value, index));
            });
            
            return new Stew(new Map(thing));
        }
        else if (this.type == "list") {
            let thing = Array.from(this.copy().insides);
            this.forEach( (value, index) => {
                thing[index] = func(value, index);
            });

            return new Stew(new Set(thing));
        }
    }


    // mapEntry
    mapEntry(func) {
        if (this.type == "pair") {
            let thing = this.entries;

            this.forEach( (key, value, index) => {
                let stuff = func(key, value, index);
                thing[index] = stuff;
            });
            
            return new Stew(new Map(thing));
        }
        else if (this.type == "list") {
            let thing = Array.from(this.copy().insides);
            this.forEach( (value, index) => {
                thing[index] = func(value, index);
            });

            return new Stew(new Set(thing));
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


    // chug
    chug(func) {
        if (this.type == "pair") {
            for (let i = 0; i < this.length; i++) {
                if (!func(this.keys[i], this.values[i], i)) return false;
            }
        }
        else if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (!func(Array.from(this.insides)[i], i)) return false;
            }
        }

        return true;
    }
    every(func) { return this.chug(func); }


    // slice
    slice(start, end) {
        if (this.type == "pair") {
            return new Stew( Object.fromEntries( this.entries.slice(start, end)) );
        }
        else if (this.type == "list") {
            return new Stew(Array.from(this.insides).slice(start, end));
        }
    }


    // sort
    sort(compare=null) {
        if (this.type == "list") {
            return new this.constructor(new Set(this.pour().sort( (rawA, rawB) => {
                let a = (typeof rawA == "string") ? rawA.toUpperCase().localeCompare(rawB) : rawA;
                let b = (typeof rawB == "string") ? rawB.toUpperCase().localeCompare(rawA) : rawB;

                return (compare) ? compare(a, b) : a - b;
            })));
        }

        else if (this.type == "pair") {
            return new this.constructor(new Map(this.entries.sort( (rawA, rawB) => {
                let a = (typeof rawA[0] == "string") ? rawA[0].toUpperCase().localeCompare(rawB[0]) : rawA[0];
                let b = (typeof rawB[0] == "string") ? rawB[0].toUpperCase().localeCompare(rawA[0]) : rawB[0];

                return (compare) ? compare(a, b) : a - b;
            })));
        }
    }


    // reverse
    reverse() {
        if (this.type == "pair") {
            this.insides = new Map( this.entries.reverse() );
            return this;
        }
        else if (this.type == "list") {
            this.insides = new Set( Array.from(this.insides).reverse() );
            return this;
        }
    }
    flip() { return this.reverse(); }


    // front
    front(offset=0) {
        let entry = this.entries[0+offset];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: 0} : entry[1];
    }
    first(offset=0) { return this.front(offset); }
	start(offset=0) { return this.front(offset); }


    // back
    back(offset=0) {
        let entry = this.entries[(this.length-1)-offset];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: this.length-1} : entry[1];
    }
    last(offset=0) { return this.back(offset); }
	end(offset=0) { return this.back(offset); }


    // rename
    rename(entry, name) {
        if (this.type == "pair") {
            let thing = this.entries;
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry][0] = name;
            return this.insides = new Map(thing);
        }
        else if (this.type == "list") {
            let thing = Array.from(this.insides);
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry] = name;
            return this.insides = new Set(thing);
        }
    }


    // dump
    dump(file, replacer=null, indent=null) {
        try {
            const fs = require('fs');

            fs.truncate(file, 0, () => {
                fs.writeFileSync(file, this.stringify(replacer, indent));
            });

            return Stew.parse(fs.readFileSync(file, 'utf8'));
        }
        catch(err) {}
    }


    // merge
    merge(/**/) {
        var args = arguments;
        var stuffs = this.copy();

        for (obj of args) {
            var obj = Stew.from(obj);

            if (obj.type == "list") {
                obj.forEach( (value, index) => {
                    (this.type == "pair") ? stuffs.push(`${index}`, value) : stuffs.push(value);
                });
            }

            if (obj.type == "pair") {
                obj.forEach( (key, value) => {
                    (this.type == "pair") ? stuffs.push(key, value) : stuffs.push( [key, value] );
                });
            }
        };

        return stuffs;
    }
    concat(/**/) { return this.merge(...Array.from(arguments)); }


    // flat
    flat(depth=1) {
        return Stew.from(Array.from(this.insides).flat(depth));
    }

    
    // flatMap
    flatMap(func, thisValue=null) {
        return Stew.from(Array.from(this.insides).flatMap(func, thisValue));
    };


    // splice
    splice(index, amount, /**/) {
        var args = Array.from(arguments);
        args.shift();
        args.shift();

        if (this.type == "list") {
            let thing = Array.from(this.insides);

            thing.splice(index, amount, ...args);

            this.insides = new Set(thing);
        }

        else if (this.type == "pair") {
            let thing = this.entries;

            if (!(args[0] instanceof Array) && args[0] instanceof Object) args = Object.entries(args[0]);

            thing.splice(index, amount, ...args);

            this.insides = new Map(thing);
        }
    }


    // includesValue
    includesValue(/**/) {
        let args = Array.from(arguments);

        if (args.length == 1 && typeof args[0] != "object") {
            let value = args[0];
            return this.values.includes(value);
        }
        else {
            if (args[0] instanceof Array) args = args[0];
            for (let i = 0; i < args.length; i++) {
                if (this.values.includes(args[i])) return true;
            }
            return false;
        }
    }
    hasValue(/**/) { return this.includesValue(...Array.from(arguments)); }
    containsValue(/**/) { return this.includesValue(...Array.from(arguments)); }
    includesValues(/**/) { return this.includesValue(...Array.from(arguments)); }
    hasValues(/**/) { return this.includesValue(...Array.from(arguments)); }
    containsValues(/**/) { return this.includesValue(...Array.from(arguments)); }


    // scoop
    scoop(/**/) {
        var args = Array.from(arguments);
        var stuff = Stew.from(this);

        if (args[0] instanceof Array) args = args[0];

        if (this.type == "list") {
            this.insides = this.filter( (value, index) => {
                if (args[0] instanceof Function) return !args[0](value, index);
                return !args.includes(index) && !args.includes(value);
            }).pour(Set);
            return stuff;
        }
        
        else if (this.type == "pair") {
            this.insides = this.filter( (key, value, index) => {
                if (args[0] instanceof Function) return !args[0](key, value, index);
                return !args.includes(index) && !args.includes(key);
            }).pour(Map);
            return stuff;
        }
    }


    // find
    find(entry, exact=false) {
        var indexes = [];
        if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (entry instanceof Function) if (entry(this[i], i)) indexes.push(i);
                if (!exact && this[i].includes(entry)) indexes.push(i);
                else if (this[i] == entry) indexes.push(i);
            }
        }
        else if (this.type == "pair") {
            for (let i = 0; i < this.keys.length; i++) {
                if (entry instanceof Function) if (entry(this.keys[i], this.values[i], i)) indexes.push(i);
                if (!exact && this.keys[i].includes(entry)) indexes.push(i);
                else if (this.keys[i] == entry) indexes.push(i);
            }
        }
        return indexes;
    }
    allIndexesOf(entry, exact=true) { return this.find(entry, exact); }
    findIndexesOf(entry, exact=true) { return this.find(entry, exact); }
    findIndexes(entry, exact=true) { return this.find(entry, exact); }
    indexesOf(entry, exact=true) { return this.find(entry, exact); }
    findAll(entry, exact=false) { return this.find(entry, exact); }


    // lastIndexOf
    lastIndexOf(entry, exact=true) {
        let stuff = this.find(entry, exact);
        return stuff[stuff.length-1];
    }
    findLast(entry, exact=true) { return this.lastIndexOf(entry, exact); }


    // then
    then(func, func2) {
        if (this.type == "list") {
            this.forEach( (value, index) => {
                if (func(value, index)) func2(value, index);
            });

        }
        else if (this.type == "pair") {
            this.forEach( (key, value, index) => {
                if (func(key, value, index)) func2(key, value, index);
            });
        }
    }


    // filterBy
    filterBy(obj, func) {
        if (!obj.type) obj = Stew.from(obj);

        if (this.type == "list") {
            return this.filter( (value, index) => {
                return func(obj.values[index], index);
            });
        }
        else if (this.type == "pair") {
            return this.filter( (key, value, index) => {
                return func(obj.keys[index], obj.values[index], index);
            });
        }
    }
    filterWith(obj, func) { return this.filterBy(obj, func) }


    // startsWith
    startsWith(/**/) {
        let args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.join("");

        for (let i = 0; i < args.length; i++) {
            if (stuff.startsWith(args[i])) return true;
        }
        return false;
    }


    // endsWith
    endsWith(/**/) {
        let args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.join("");

        for (let i = 0; i < args.length; i++) {
            if (stuff.endsWith(args[i])) return true;
        }
        return false;
    }


    // toUpperCase
    toUpperCase() {
		let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		
        var stuff = this.copy();
		
        if (stuff.type == "list") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff[i] == "string") stuff.set(i, stuff[i].toUpperCase());
				});
			}
            else stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
            });
        }
        else if (stuff.type == "pair") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff.values[i] == "string") stuff.set(i, stuff.values[i].toUpperCase());
					if (typeof stuff.keys[i] == "string") stuff.rename(i, stuff.keys[i].toUpperCase());
				});
			}
            else stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
                if (typeof key == "string") stuff.rename(index, key.toUpperCase());
            });
        }
        return stuff;
    }


    // toLowerCase
    toLowerCase() {
        let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		
        var stuff = this.copy();
		
        if (stuff.type == "list") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff[i] == "string") stuff.set(i, stuff[i].toLowerCase());
				});
			}
            else stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
            });
        }
        else if (stuff.type == "pair") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff.values[i] == "string") stuff.set(i, stuff.values[i].toLowerCase());
					if (typeof stuff.keys[i] == "string") stuff.rename(i, stuff.keys[i].toLowerCase());
				});
			}
            else stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
                if (typeof key == "string") stuff.rename(index, key.toLowerCase());
            });
        }
        return stuff;
    }


    // replace
    replace(entry, replaceWith) {
        let thing = this.copy();
        if (thing.type == "list") {
            for (let i = 0; i < thing.length; i++) {
                if (thing[i].includes(entry)) {
                    thing.set(i, thing[i].replace(entry, replaceWith));
                    break;
                }
            }
        }
        else if (thing.type == "pair") {
            for (let i = 0; i < thing.length; i++) {
                if (thing.keys[i].includes(entry)) {
                    thing.rename(i, thing.keys[i].replace(entry, replaceWith));
                    break;
                }
            }
        }

        return thing;
    }
    replaceOne(entry, replaceWith) { return this.replace(entry, replaceWith); }


    // replaceAll
    replaceAll(entry, replaceWith) {
        let thing = this.copy();
        if (thing.type == "list") {
            thing.forEach( (value, index) => {
                var stuff = value; while (stuff.includes(entry)) stuff = stuff.replace(entry, replaceWith);
                
                if (value.includes(entry)) thing.set(index, stuff);
            });
        }
        else if (thing.type == "pair") {
            thing.forEach( (key, value, index) => {
                var stuff = key; while (stuff.includes(entry)) stuff = stuff.replace(entry, replaceWith);
                
                if (key.includes(entry)) thing.rename(index, stuff);
            });
        }
        
        return thing;
    }


    // append
    append(index, key, value=null) {
        var stuff;
        if (this.type == "list") {
            stuff = new Stew(Array);
            this.forEach( (v, i) => {
                if (i == index) stuff.push(key);
                stuff.push(v);
            });

            this.insides = stuff.pour(Set);
        }
        else if (this.type == "pair") {
            stuff = new Stew(Object);
            this.forEach( (k, v, i) => {
                if (i == index) stuff.push(key, value);
                stuff.push(k, v);
            });

            this.insides = stuff.pour(Map);
        }
    }
    insert(index, key, value=null) { return this.append(index, key, value); }
    push_to(index, key, value=null) { return this.append(index, key, value); }
    push_at(index, key, value=null) { return this.append(index, key, value); }


    // vary
    vary(obj) {
        let thing = Soup.from(obj).toLowerCase()[this.type];
        this.constructor.prototype.VaryFunction = thing;
        let returns = this.VaryFunction();
        delete this.constructor.prototype.VaryFunction;
        return returns;
    }


    // split
    split(/**/) {
        var args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        var stuff = this.copy();
        stuff = stuff.vary({
            list() {
                let things = stuff.map( (v) => {
                    if (typeof v == "string") {
                        args.forEach( (sep) => { v = v.split(sep).join("<=SPLITHERE=>") } );
                        return v.split("<=SPLITHERE=>");
                    }
                    else {
                        return [v];
                    }
                });

                things = things.pour().flat();
                things = things.filter( (v) => { return v != ""});
                return things;
            },
            pair() {
                let things = stuff.map( (k, v) => {
                    if (typeof v == "string") {
                        args.forEach( (sep) => { if (v.includes(sep)) v = v.split(sep).join("<=SPLITHERE=>") } );
                        return v.split("<=SPLITHERE=>");
                    }
                    else {
                        return v;
                    }
                });

                things = things.map( (k, v) => {
                    return (v instanceof Array) ? v.filter( (inner) => { return inner != ""}) : v;
                });
                
                return things;
            }
        });

        return new this.constructor(stuff);
    }


    // trim
    trim() {
        var copy = this.copy();

        if (copy.type == "list") {
            copy = copy.map( (v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        else if (copy.type == "pair") {
            copy = copy.mapKey( (k, v) => { return (typeof k == "string") ? k.trim() : k; });
            copy = copy.map( (k, v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        return copy;
    }


    // trimKeys
    trimKeys() {
        var copy = this.copy();

        if (copy.type == "list") copy = copy.trim();

        else if (copy.type == "pair") {
            copy = copy.mapKey( (k, v) => { return (typeof k == "string") ? k.trim() : k; });
        }

        return copy;
    }


    // trimValues
    trimValues() {
        var copy = this.copy();

        if (copy.type == "list") copy = copy.trim();

        else if (copy.type == "pair") {
            copy = copy.map( (k, v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        return copy;
    }
	trimVals() { return this.trimValues(); }


    // sortBy
    sortBy(obj, compare=null) {
        if (!obj.type) obj = Soup.from(obj);
        obj = obj.copy();
		var copy = this.copy();

        var stuff = [];

        obj.sort( (rawA, rawB) => {
            let a = (typeof rawA == "string") ? rawA.toUpperCase().localeCompare(rawB) : rawA;
            let b = (typeof rawB == "string") ? rawB.toUpperCase().localeCompare(rawA) : rawB;

            stuff.push( [a, b] );

            return (compare) ? compare(a, b) : a - b;
        });

        var i = 0;
        
        return new copy.constructor(copy.sort( (_a, _b) => {
            let [a, b] = stuff[i]; i++;

            return (compare) ? compare(a, b) : a - b;
        }));
    }
    sortWith(obj, compare=null) { return this.sortBy(obj, compare) }


	// fetch
	fetch(entry) {
		var index = (typeof entry == "string") ? this.indexOf(entry) : (typeof entry == "number") ? entry : NaN;
		
		var entry = this.entries[index];
		var value = this.get(index);
		
		return this.vary({
			list() { return { value: value, index: index }; },
			pair() { return { key: entry[0], value: entry[1], index: index }; }
		});
	};


	// fetchValue
	fetchValue(entry) {
		var index = this.values.indexOf(entry);
		
		var entry = this.entries[index];
		var value = this.get(index);
		
		return this.vary({
			list() { return { value: value, index: index }; },
			pair() { return { key: entry[0], value: entry[1], index: index }; }
		});
	};
	fetchVal(entry) { return this.fetchValue(entry); }


    // copy
    copy() {
        return new this.constructor(this.pour());
    }


    // properties
    get properties() {
        let proto = Stew.prototype;
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
            else if ( Stew.primaryInfo.includes(name) ) {
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
            return Stew.primaryInfo.includes(entry[0]);
        }));

        return {
            names: names,
            descriptors: Object.getOwnPropertyDescriptors(proto),
            methods: methods,
            info: info
        }
    }
    get props() { return this.properties; }


    // this part isn't documented bc it's for JSON.stringify()
    toJSON() {
        return this.pour(Object);
    }


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


    // async iterator ( for await..of )
    [Symbol.asyncIterator]() {
        var stuff = this;
        return {
            current: 0,
            last: stuff.length-1,

            async next() {
                if (this.current <= this.last) {
                    let data = (stuff.type == "pair") ? stuff.entries[this.current++] : stuff.get(this.current++);
                    return { done: false, value: data };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

function StewProxyHandler() { return {

        get(target, prop) {
            if (Object.getOwnPropertyNames(Stew.prototype).includes(prop) || target[prop]) { // if it's a function or main thing
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
                    target.insides.delete(target.keys[Number(prop)]);
                }
                else if (target.type == "list") {
                    target.insides.delete(target.values[Number(prop)]);
                }
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
		if (object instanceof Noodle) {
			object = object.content;
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
        else if (typeof object == "number") {
            object = object.toString().split("").map( (value) => { return Number(value) } );
            this.insides = object;
            this.type = "list";
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

        Object.defineProperty(this, "splitter", {
            value: new String(splitter)
        });

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
    del(entry) { return this.delete(entry); }
    remove(entry) { return this.delete(entry); }
    rem(entry) { return this.delete(entry); }


    // push
    push(entry, value=null) {
        if (this.type == "pair") {
            this.insides[entry] = value;
        }
        else if (this.type == "list") return this.insides.push(entry);
    }
    add(entry, value=null) { return this.push(entry, value); }
    push_back(entry, value=null) { return this.push(entry, value); }
    

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
                this.insides[this.keys[entry]] = set_to;
            }
            else if (this.type == "list") return this.insides[entry] = set_to;
        }
    }
    edit(entry, set_to=null) { return this.set(entry, set_to) };


    // pull
    pull(entry, value=null) {
        if (this.type == "pair") {
            let thing = this.entries;
            thing.unshift( [entry, value] );
            this.insides = Object.fromEntries(thing);
        }
        else if (this.type == "list") return this.insides.unshift(entry);
    }
    unshift(entry, value=null) { return this.pull(entry, value); }
    push_front(entry, value=null) { return this.pull(entry, value); }


    // pop
    pop(offset=0) {
        let index = (this.length-1)-offset;
        let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
        delete this[index];
        return returns;
    }
    unpush(offset=0) { return this.pop(offset); }


    // shift
    shift(offset=0) {
        let index = 0+offset;
        let returns = (this.type == "pair") ? {key: this.keys[index], value: this.values[index], index: index} : {value: this.entries[index][1], index: index};
        delete this[index];
        return returns;
    }
    unpull(offset=0) { return this.shift(offset); }


    // pour
    pour(type=null, joiner='') {
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

        else if (type instanceof String || (typeof type == "string" && type.toLowerCase() == 'string'))
            return (this.type=="pair") ? this.keys.join(joiner) : this.insides.join(joiner);

        else if (type instanceof Object || (typeof type == "string" && type.toLowerCase() == 'object') || (type == null && this.type == "pair"))
            return Object.fromEntries(
                (this.type=="pair") ? this.entries
                : Soup.from(this.insides).entries
            );
    }
    fix(type=null, joiner='') { return this.pour(type, joiner); }
    to(type=null, joiner='') { return this.pour(type, joiner); }


    // keyOf
    keyOf(entry) {
        if (this.type == "pair") {
            if (typeof entry == "string" && this.hasValue(entry)) return this.keys[ this.values.indexOf(entry) ];
            else return this.keys[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        }
        else if (this.type == "list") return this.insides[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // valueOf
    valueOf(entry) {
        if (this.type == "pair") return this.values[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return this.insides[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // indexOf
    indexOf(entry, exact=true) {
        let stuff = this.find(entry, exact);
        return stuff[0];
    }
    indexOfKey(entry, exact=true) { return this.indexOf(entry, exact); }
    firstIndexOf(entry, exact=true) { return this.indexOf(entry, exact); }
    findFirst(entry, exact=true) { return this.indexOf(entry, exact); }


    // indexOfValue
    indexOfValue(entry) {
        if (this.type == "pair") return this.values.indexOf(entry);
        else if (this.type == "list") return this.insides.indexOf(entry);
    }


    // entryOf
    entryOf(entry) {
        return this.entries[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // length
    get length() {
        return this.keys.length;
    }
    get size() { return this.length; }


    // get
    get(entry) {
        if (typeof entry == "string") {
            if (this.type == "pair") return this.insides[entry];
            else if (this.type == "list") return this.insides[this.insides.indexOf(entry)];
        }
        else if (typeof entry == "number") {
            if (this.type == "pair") return this.insides[this.keys[entry]];
            else if (this.type == "list") return this.insides[entry];
        }
    }
    at(entry) { return this.get(entry); }


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
        return (this.type == "pair") ? this.entries.toString() : this.insides.toString();
    }


    // join
    join(joiner=",") {
        return (this.type == "list") ? this.insides.join(joiner) : this.keys.join(joiner);
    }
    joinKeys(joiner=",") { return this.join(joiner); }


    // joinValues
    joinValues(joiner=",") {
        return (this.type == "list") ? this.insides.join(joiner) : this.values.join(joiner);
    }


    // includes
    includes(/**/) {
        let args = Array.from(arguments);

        if (args.length == 1 && typeof args[0] != "object") {
            var entry = args[0];

            if (this.type == "pair") return this.keys.includes(entry);
            else if (this.type == "list") return this.insides.includes(entry);
        }
        else {
            if (args[0] instanceof Array) args = args[0];
            for (let i = 0; i < args.length; i++) {
			    if (this.includes(args[i])) return true;
		    }
		    return false;
        }
    }
    contains(/**/) { return this.includes(...Array.from(arguments)); }
    has(/**/) { return this.includes(...Array.from(arguments)); }

    
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
            let entries = this.entries;
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
            let thing = this.entries;

            this.forEach( (key, value, index) => {
                thing[index][1] = func(key, value, index);
            });
            
            return new Soup(Object.fromEntries(thing));
        }
        else if (this.type == "list") {
            let thing = this.copy().insides;

            this.forEach( (value, index) => {
                thing[index] = func(value, index);
            });

            return new Soup(thing);
        }
    }
    mapValue(func) { return this.map(func); }


    // mapKey
    mapKey(func) {
        if (this.type == "pair") {
            let thing = this.copy();

            this.forEach( (key, value, index) => {
                thing.rename(index, func(key, value, index));
            });
            
            return new Soup(Object.fromEntries(thing));
        }
        else if (this.type == "list") {
            let thing = Array.from(this.copy().insides);
            this.forEach( (value, index) => {
                thing[index] = func(value, index);
            });

            return new Soup(thing);
        }
    }


    // mapEntry
    mapEntry(func) {
        if (this.type == "pair") {
            let thing = this.entries;

            this.forEach( (key, value, index) => {
                let stuff = func(key, value, index);
                thing[index] = stuff;
            });
            
            return new Soup(Object.fromEntries(thing));
        }
        else if (this.type == "list") {
            let thing = this.copy().insides;

            this.forEach( (value, index) => {
                thing[index] = func(value, index);
            });

            return new Soup(thing);
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


    // chug
    chug(func) {
        if (this.type == "pair") {
            for (let i = 0; i < this.length; i++) {
                if (!func(this.keys[i], this.values[i], i)) return false;
            }
        }
        else if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (!func(this.insides[i], i)) return false;
            }
        }

        return true;
    }
    every(func) { return this.chug(func); }


    // slice
    slice(start, end) {
        if (this.type == "pair") {
            return new Soup( Object.fromEntries( this.entries.slice(start, end)) );
        }
        else if (this.type == "list") {
            return new Soup(this.insides.slice(start, end));
        }
    }
    

    // sort
    sort(compare=null) {
        if (this.type == "list") {
            return new this.constructor(this.copy().insides.sort( (rawA, rawB) => {
                let a = (typeof rawA == "string") ? rawA.toUpperCase().localeCompare(rawB) : rawA;
                let b = (typeof rawB == "string") ? rawB.toUpperCase().localeCompare(rawA) : rawB;

                return (compare) ? compare(a, b) : a - b;
            }));
        }

        else if (this.type == "pair") {
            return new this.constructor(Object.fromEntries(this.copy().entries.sort( (rawA, rawB) => {
                let a = (typeof rawA[0] == "string") ? rawA[0].toUpperCase().localeCompare(rawB[0]) : rawA[0];
                let b = (typeof rawB[0] == "string") ? rawB[0].toUpperCase().localeCompare(rawA[0]) : rawB[0];

                return (compare) ? compare(a, b) : a - b;
            })));
        }
    }


    // reverse
    reverse() {
        if (this.type == "pair") {
            this.insides = Object.fromEntries( this.entries.reverse() );
            return this;
        }
        else if (this.type == "list") {
            this.insides = this.insides.reverse();
            return this;
        }
    }
    flip() { return this.reverse(); }


    // front
    front(offset=0) {
        let entry = this.entries[0+offset];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: 0} : entry[1];
    }
    first(offset=0) { return this.front(offset); }
	start(offset=0) { return this.front(offset); }


    // back
    back(offset=0) {
        let entry = this.entries[(this.length-1)-offset];
        return (this.type == "pair") ? {key: entry[0], value: entry[1], index: this.length-1} : entry[1];
    }
    last(offset=0) { return this.back(offset); }
	end(offset=0) { return this.back(offset); }


    // rename
    rename(entry, name) {
        if (this.type == "pair") {
            let thing = this.entries;
            thing[(typeof entry == "string") ? this.indexOf(entry) : entry][0] = name;
            return this.insides = Object.fromEntries(thing);
        }
        else if (this.type == "list") {
            return this.insides[(typeof entry == "string") ? this.indexOf(entry) : entry] = name;
        }
    }
    

    // deleteDupes
    deleteDupes() {
        return Soup.from(Stew.from(this));
    }
    delDupes() { return this.deleteDupes(); }
    removeDupes() { return this.deleteDupes(); }
    remDupes() { return this.deleteDupes(); }


    // dump
    dump(file, replacer=null, indent=null) {
        try {
            const fs = require('fs');

            fs.truncate(file, 0, () => {
                fs.writeFileSync(file, this.stringify(replacer, indent));
            });

            return Soup.parse(fs.readFileSync(file, 'utf8'));
        }
        catch(err) {}
    }


    // merge
    merge(/**/) {
        var args = arguments;
        var stuffs = this.copy();

        for (obj of args) {
            var obj = Soup.from(obj);

            if (obj.type == "list") {
                obj.forEach( (value, index) => {
                    (this.type == "pair") ? stuffs.push(`${index}`, value) : stuffs.push(value);
                });
            }

            if (obj.type == "pair") {
                obj.forEach( (key, value) => {
                    (this.type == "pair") ? stuffs.push(key, value) : stuffs.push( [key, value] );
                });
            }
        };

        return stuffs;
    }
    concat(/**/) { return this.merge(...Array.from(arguments)); }


    // flat
    flat(depth=1) {
        return Soup.from( (this.type == "list") ? this.insides.flat(depth) : this.entries.flat(depth));
    }


    // flatMap
    flatMap(func) {
        return Soup.from( (this.type == "list") ? this.insides.flatMap(func) : this.entries.flatMap(func));
    };


    // splice
    splice(index, amount, /**/) {
        var args = Array.from(arguments);
        args.shift();
        args.shift();

        if (this.type == "list") this.insides.splice(index, amount, ...args);

        else if (this.type == "pair") {
            let thing = Object.entries(this.insides);

            if (!(args[0] instanceof Array) && args[0] instanceof Object) args = Object.entries(args[0]);

            thing.splice(index, amount, ...args);

            this.insides = Object.fromEntries(thing);
        }
    }


    // includesValue
    includesValue(/**/) {
        let args = Array.from(arguments);

        if (args.length == 1 && typeof args[0] != "object") {
            let value = args[0];
            return this.values.includes(value);
        }
        else {
            if (args[0] instanceof Array) args = args[0];
            for (let i = 0; i < args.length; i++) {
                if (this.values.includes(args[i])) return true;
            }
            return false;
        }
    }
    hasValue(/**/) { return this.includesValue(...Array.from(arguments)); }
    containsValue(/**/) { return this.includesValue(...Array.from(arguments)); }
    includesValues(/**/) { return this.includesValue(...Array.from(arguments)); }
    hasValues(/**/) { return this.includesValue(...Array.from(arguments)); }
    containsValues(/**/) { return this.includesValue(...Array.from(arguments)); }


    // scoop
    scoop(/**/) {
        var args = Array.from(arguments);
        var stuff = Soup.from(this);

        if (args[0] instanceof Array) args = args[0];

        if (this.type == "list") {
            this.insides = this.filter( (value, index) => {
                if (args[0] instanceof Function) return !args[0](value, index);
                return !args.includes(index) && !args.includes(value);
            }).pour();
            return stuff;
        }

        else if (this.type == "pair") {
            this.insides = this.filter( (key, value, index) => {
                if (args[0] instanceof Function) return !args[0](key, value, index);
                return !args.includes(index) && !args.includes(key);
            }).pour();
            return stuff;
        }
    }


    // find
    find(entry, exact=false) {
        var indexes = [];
        if (this.type == "list") {
            for (let i = 0; i < this.length; i++) {
                if (entry instanceof Function) if (entry(this[i], i)) indexes.push(i);
                if (!exact && this[i].includes(entry)) indexes.push(i);
                else if (this[i] == entry) indexes.push(i);
            }
        }
        else if (this.type == "pair") {
            for (let i = 0; i < this.keys.length; i++) {
                if (entry instanceof Function) if (entry(this.keys[i], this.values[i], i)) indexes.push(i);
                if (!exact && this.keys[i].includes(entry)) indexes.push(i);
                else if (this.keys[i] == entry) indexes.push(i);
            }
        }
        return indexes;
    }
    allIndexesOf(entry, exact=true) { return this.find(entry, exact); }
    findIndexesOf(entry, exact=true) { return this.find(entry, exact); }
    findIndexes(entry, exact=true) { return this.find(entry, exact); }
    indexesOf(entry, exact=true) { return this.find(entry, exact); }
    findAll(entry, exact=false) { return this.find(entry, exact); }


    // lastIndexOf
    lastIndexOf(entry, exact=true) {
        let stuff = this.find(entry, exact);
        return stuff[stuff.length-1];
    }
    findLast(entry, exact=true) { return this.lastIndexOf(entry, exact); }


    // then
    then(func, func2) {
        if (this.type == "list") {
            this.forEach( (value, index) => {
                if (func(value, index)) func2(value, index);
            });

        }
        else if (this.type == "pair") {
            this.forEach( (key, value, index) => {
                if (func(key, value, index)) func2(key, value, index);
            });
        }
    }


    // filterBy
    filterBy(obj, func) {
        if (!obj.type) obj = Soup.from(obj);

        if (this.type == "list") {
            return this.filter( (value, index) => {
                return func(obj.values[index], index);
            });
        }
        else if (this.type == "pair") {
            return this.filter( (key, value, index) => {
                return func(obj.keys[index], obj.values[index], index);
            });
        }
    }
    filterWith(obj, func) { return this.filterBy(obj, func) }


    // startsWith
    startsWith(/**/) {
        let args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.join("");

        for (let i = 0; i < args.length; i++) {
            if (stuff.startsWith(args[i])) return true;
        }
        return false;
    }


    // endsWith
    endsWith(/**/) {
        let args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.join("");

        for (let i = 0; i < args.length; i++) {
            if (stuff.endsWith(args[i])) return true;
        }
        return false;
    }


    // toUpperCase
    toUpperCase() {
		let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		
        var stuff = this.copy();
		
        if (stuff.type == "list") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff[i] == "string") stuff.set(i, stuff[i].toUpperCase());
				});
			}
            else stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
            });
        }
        else if (stuff.type == "pair") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff.values[i] == "string") stuff.set(i, stuff.values[i].toUpperCase());
					if (typeof stuff.keys[i] == "string") stuff.rename(i, stuff.keys[i].toUpperCase());
				});
			}
            else stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
                if (typeof key == "string") stuff.rename(index, key.toUpperCase());
            });
        }
        return stuff;
    }


    // toLowerCase
    toLowerCase() {
    	let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		
        var stuff = this.copy();
		
        if (stuff.type == "list") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff[i] == "string") stuff.set(i, stuff[i].toLowerCase());
				});
			}
            else stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
            });
        }
        else if (stuff.type == "pair") {
			if (args.length > 0) {
				args.forEach( (i) => {
					if (typeof stuff.values[i] == "string") stuff.set(i, stuff.values[i].toLowerCase());
					if (typeof stuff.keys[i] == "string") stuff.rename(i, stuff.keys[i].toLowerCase());
				});
			}
            else stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
                if (typeof key == "string") stuff.rename(index, key.toLowerCase());
            });
        }
        return stuff;
    }


    // replace
    replace(entry, replaceWith) {
        let thing = this.copy();
        if (thing.type == "list") {
            for (let i = 0; i < thing.length; i++) {
                if (thing[i].includes(entry)) {
                    thing.set(i, thing[i].replace(entry, replaceWith));
                    break;
                }
            }
        }
        else if (thing.type == "pair") {
            for (let i = 0; i < thing.length; i++) {
                if (thing.keys[i].includes(entry)) {
                    thing.rename(i, thing.keys[i].replace(entry, replaceWith));
                    break;
                }
            }
        }

        return thing;
    }
    replaceOne(entry, replaceWith) { return this.replace(entry, replaceWith); }


    // replaceAll
    replaceAll(entry, replaceWith) {
        let thing = this.copy();
        if (thing.type == "list") {
            thing.forEach( (value, index) => {
                var stuff = value; while (stuff.includes(entry)) stuff = stuff.replace(entry, replaceWith);

                if (value.includes(entry)) thing.set(index, stuff );
            });
        }
        else if (thing.type == "pair") {
            thing.forEach( (key, value, index) => {
                var stuff = key; while (stuff.includes(entry)) stuff = stuff.replace(entry, replaceWith);

                if (key.includes(entry)) thing.rename(index, stuff);
            });
        }
        
        return thing;
    }


    // append
    append(index, key, value=null) {
        var stuff;
        if (this.type == "list") {
            stuff = new Soup(Array);
            this.forEach( (v, i) => {
                if (i == index) stuff.push(key);
                stuff.push(v);
            });
        }
        else if (this.type == "pair") {
            stuff = new Soup(Object);
            this.forEach( (k, v, i) => {
                if (i == index) stuff.push(key, value);
                stuff.push(k, v);
            });
        }
        
        this.insides = stuff.pour();
    }
    insert(index, key, value=null) { return this.append(index, key, value); }
    push_to(index, key, value=null) { return this.append(index, key, value); }
    push_at(index, key, value=null) { return this.append(index, key, value); }


    // vary
    vary(obj) {
        let thing = Soup.from(obj).toLowerCase()[this.type];
        this.constructor.prototype.VaryFunction = thing;
        let returns = this.VaryFunction();
        delete this.constructor.prototype.VaryFunction;
        return returns;
    }


    // split
    split(/**/) {
        var args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        var stuff = this.copy();
        stuff = stuff.vary({
            list() {
                let things = stuff.map( (v) => {
                    if (typeof v == "string") {
                        args.forEach( (sep) => { v = v.split(sep).join("<=SPLITHERE=>") } );
                        return v.split("<=SPLITHERE=>");
                    }
                    else {
                        return [v];
                    }
                });

                things = things.pour().flat();
                things = things.filter( (v) => { return v != ""});
                return things;
            },
            pair() {
                let things = stuff.map( (k, v) => {
                    if (typeof v == "string") {
                        args.forEach( (sep) => { if (v.includes(sep)) v = v.split(sep).join("<=SPLITHERE=>") } );
                        return v.split("<=SPLITHERE=>");
                    }
                    else {
                        return v;
                    }
                });

                things = things.map( (k, v) => {
                    return (v instanceof Array) ? v.filter( (inner) => { return inner != ""}) : v;
                });
                
                return things;
            }
        });

        return new this.constructor(stuff);
    }


    // trim
    trim() {
        var copy = this.copy();

        if (copy.type == "list") {
            copy = copy.map( (v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        else if (copy.type == "pair") {
            copy = copy.mapKey( (k, v) => { return (typeof k == "string") ? k.trim() : k; });
            copy = copy.map( (k, v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        return copy;
    }


    // trimKeys
    trimKeys() {
        var copy = this.copy();

        if (copy.type == "list") copy = copy.trim();

        else if (copy.type == "pair") {
            copy = copy.mapKey( (k, v) => { return (typeof k == "string") ? k.trim() : k; });
        }

        return copy;
    }


    // trimValues
    trimValues() {
        var copy = this.copy();

        if (copy.type == "list") copy = copy.trim();

        else if (copy.type == "pair") {
            copy = copy.map( (k, v) => { return (typeof v == "string") ? v.trim() : v; });
        }

        return copy;
    }
	trimVals() { return this.trimValues(); }


    // sortBy
    sortBy(obj, compare=null) {
        if (!obj.type) obj = Soup.from(obj);
        obj = obj.copy();
		var copy = this.copy();

        var stuff = [];

        obj.sort( (rawA, rawB) => {
            let a = (typeof rawA == "string") ? rawA.toUpperCase().localeCompare(rawB) : rawA;
            let b = (typeof rawB == "string") ? rawB.toUpperCase().localeCompare(rawA) : rawB;

            stuff.push( [a, b] );

            return (compare) ? compare(a, b) : a - b;
        });

        var i = 0;
        
        return new copy.constructor(copy.sort( (_a, _b) => {
            let [a, b] = stuff[i]; i++;

            return (compare) ? compare(a, b) : a - b;
        }));
    }
    sortWith(obj, compare=null) { return this.sortBy(obj, compare) }


	// fetch
	fetch(entry) {
		var index = (typeof entry == "string") ? this.indexOf(entry) : (typeof entry == "number") ? entry : NaN;
		
		var entry = this.entries[index];
		var value = this.get(index);
		
		return this.vary({
			list() { return { value: value, index: index }; },
			pair() { return { key: entry[0], value: entry[1], index: index }; }
		});
	};


	// fetchValue
	fetchValue(entry) {
		var index = this.values.indexOf(entry);
		
		var entry = this.entries[index];
		var value = this.get(index);
		
		return this.vary({
			list() { return { value: value, index: index }; },
			pair() { return { key: entry[0], value: entry[1], index: index }; }
		});
	};
	fetchVal(entry) { return this.fetchValue(entry); }


    // copy
    copy() {
        return new this.constructor(this.pour());
    }


    // properties
    get properties() {
        let proto = Soup.prototype;
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


    // this part isn't documented bc it's for JSON.stringify()
    toJSON() {
        return this.pour(Object);
    }


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


    // async iterator ( for await..of )
    [Symbol.asyncIterator]() {
        var stuff = this;
        return {
            current: 0,
            last: stuff.length-1,

            async next() {
                if (this.current <= this.last) {
                    let data = (stuff.type == "pair") ? stuff.entries[this.current++] : stuff.get(this.current++);
                    return { done: false, value: data };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

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


class Noodle {
    constructor(object, joiner=",") {
        if (object instanceof Function) object = new object();
        if (object instanceof Stew || object instanceof Soup) {
            object = object.join(joiner);
        }
        if (!object) {
            this.content = "";
        }
		else if (object instanceof Noodle) {
			this.content = object.content;
			joiner = (joiner != object.joiner) ? joiner : object.joiner;
		}
        else if (typeof object == "string") {
            this.content = object;
        }
        else if (typeof object == "number") {
            this.content = object.toString(); 
        }
        else if (object instanceof Array) {
            this.content = object.join(joiner);
        }
        else if (object instanceof Set) {
            this.content = Array.from(object).join(joiner);
        }
        else if (object instanceof Map || object instanceof Object) {
            this.content = Soup.from(object).join(joiner);
        }
        else if (object instanceof String) {
            this.content = object;
        }

        Object.defineProperty(this, "joiner", {
            value: new String(joiner)
        });

        return new Proxy(this, NoodProxyHandler());
    }

	// delete
    delete(index) {
        var returns;
		
		returns = { char: this.get(index), index: index };

		let stuff = Soup.from(this.content);
		delete stuff[index];

		this.content = stuff.join("");
		
        return returns;
    }
    del(index) { return this.delete(index); }
    remove(index) { return this.delete(index); }
    rem(index) { return this.delete(index); }


	// deleteWord
    deleteWord(index) {
        var returns;
		
		returns = { char: this.getWord(index), index: index };

		let stuff = Soup.from(this.content, " ");
		delete stuff[index];

		this.content = stuff.join(" ");
		
        return returns;
    }
    delWord(index) { return this.deleteWord(index); }
    removeWord(index) { return this.deleteWord(index); }
    remWord(index) { return this.deleteWord(index); }


    // push
    push(value) {
        let stuff = Soup.from(this.content);
		stuff.push(value);
		return this.content = stuff.join("");
    }
    add(value=null) { return this.push(value); }
    push_back(value=null) { return this.push(value); }
    

    // set
    set(index, set_to=null) {
		let stuff = Soup.from(this.content);
        stuff.set(index, set_to);
		return this.content = stuff.join("");
    }
    edit(index, set_to=null) { return this.set(index, set_to) };

	
	// setWord
    setWord(index, set_to=null) {
		let stuff = Soup.from(this.content, " ");
        stuff.set(index, set_to);
		return this.content = stuff.join(" ");
    }
    editWord(index, set_to=null) { return this.setWord(index, set_to) };


    // pull
    pull(value) {
        let stuff = Soup.from(this.content);
		stuff.pull(value);
		return this.content = stuff.join("");
    }
    unshift(entry, value=null) { return this.pull(entry, value); }
    push_front(entry, value=null) { return this.pull(entry, value); }


    // pop
    pop(offset=0) {
        let index = (this.length-1)-offset;
        let returns = { value: this.get(index), index: index };
        this.delete(index);
        return returns;
    }
    unpush(offset=0) { return this.pop(offset); }


	// popWord
    popWord(offset=0) {
        let index = (this.wordCount-1)-offset;
        let returns = { value: this.getWord(index), index: index };
        this.deleteWord(index);
        return returns;
	}
	unpushWord(offset=0) { return this.popWord(offset); }


    // shift
    shift(offset=0) {
        let index = 0+offset;
        let returns = { value: this.get(index), index: index };
        this.delete(index);
        return returns;
    }
    unpull(offset=0) { return this.shift(offset); }


	// shiftWord
    shiftWord(offset=0) {
        let index = 0+offset;
        let returns = { value: this.getWord(index), index: index };
        this.deleteWord(index);
        return returns;
    }
    unpullWord(offset=0) { return this.shiftWord(offset); }


	// indexOf
	indexOf(entry) {
		return this.content.indexOf(entry);
	}


	// lastIndexOf
	lastIndexOf(entry) {
		return this.content.lastIndexOf(entry);
	}

	
	// indexesOf
    indexesOf(entry) {
    	let index = this.content.indexOf(entry);
		let length = entry.length;

		let stuff = [ index ];

		for (let i = 1; i < length; i++) {
			stuff.push(index + i);
		}

		return stuff;
    }

	
	// lastIndexesOf
    lastIndexesOf(entry) {
    	let index = this.content.lastIndexOf(entry);
		let length = entry.length;

		let stuff = [ index ];

		for (let i = 1; i < length; i++) {
			stuff.push(index + i);
		}

		return stuff;
    }
	

    // length
    get length() {
        return this.content.split("").length;
    }
    get size() { return this.length; }


	// words
	get words() {
		return new Soup(this.content.split(" "));
	}
	get sections() { return this.words; }
	
	
	// wordCount
    get wordCount() {
        return this.content.split(" ").length;
    }


    // get
    get(index) {
        return this.content.split("")[index]
    }
    at(index) { return this.get(index); }

	
	// getWord
    getWord(index) {
        return this.content.split(" ")[index]
    }
    wordAt(index) { return this.getWord(index); }

	
	// getCharCode
    getCharCode(index) {
        return this.content.charCodeAt(index);
    }
    charCodeAt(index) { return this.getWord(index); }

	
	// getCodePoint
    getCodePoint(index) {
        return this.content.codePointAt(index);
    }
    codePointAt(index) { return this.getWord(index); }


    // forEach
    forEach(func) {
        for (let i = 0; i < this.length; i++) {
			func(this.get(i));
		}
    }
	forEachChar(func) { return this.forEach(func); }

	
	// forEachWord
    forEachWord(func) {
        for (let i = 0; i < this.wordCount; i++) {
			func(this.getWord(i));
		}
    }


    // includes
    includes(/**/) {
        let args = Array.from(arguments);
		if (args.length == 1 && args[0] instanceof Array) args = args[0];

        return args.some( (v) => { return this.content.includes(v); });
    }
    contains(/**/) { return this.includes(...Array.from(arguments)); }
    has(/**/) { return this.includes(...Array.from(arguments)); }

    
    // clear
    clear() {
        return this.content = "";
    }


    // filter
    filter(func) {
		let stuff = Soup.from(this.copy());
		stuff = stuff.filter(func);
		return new this.constructor(stuff.join(""));
    }
	filterChars(func) { return this.filter(func); }


	// filterWords
    filterWords(func) {
		let stuff = Soup.from(this.copy(), " ");
		stuff = stuff.filter(func);
		return new this.constructor(stuff.join(" "));
    }


    // map
    map(func) {
        let stuff = Soup.from(this.copy());
		stuff = stuff.map(func);
		return new this.constructor(stuff.join(""));
    }
	mapChars(func) { return this.map(func); }


	// mapWords
    mapWords(func) {
		let stuff = Soup.from(this.copy(), " ");
		stuff = stuff.map(func);
		return new this.constructor(stuff.join(" "));
    }
	

    // swig
    swig(func) {
        let stuff = Soup.from(this.copy(), "");
		return stuff.swig(func);
    }
    some(func) { return this.swig(func); }


	// swigWord
    swigWord(func) {
        let stuff = Soup.from(this.copy(), " ");
		return stuff.swig(func);
    }
    someWord(func) { return this.swigWord(func); }


    // chug
    chug(func) {
        let stuff = Soup.from(this.copy(), "");
		return stuff.chug(func);
    }
    every(func) { return this.chug(func); }


	// chugWord
    chugWord(func) {
        let stuff = Soup.from(this.copy(), " ");
		return stuff.chug(func);
    }
    everyWord(func) { return this.chugWord(func); }
	

    // reverse
    reverse() {
		this.content = Soup.from(this.content).reverse().join("");
		return this;
    }
    flip() { return this.reverse(); }


    // front
    front(offset=0) {
        return this.get(0+offset);
    }
    first(offset=0) { return this.front(offset); }
	start(offset=0) { return this.front(offset); }

	
	// frontWord
    frontWord(offset=0) {
        return this.getWord(0+offset);
    }
    firstWord(offset=0) { return this.frontWord(offset); }
	startWord(offset=0) { return this.frontWord(offset); }


    // back
    back(offset=0) {
        return this.get( (this.length-1)-offset );
    }
    last(offset=0) { return this.back(offset); }
	end(offset=0) { return this.back(offset); }


	// backWord
    backWord(offset=0) {
        return this.getWord( (this.words-1)-offset );
    }
    lastWord(offset=0) { return this.backWord(offset); }
	endWord(offset=0) { return this.backWord(offset); }


    // scoop
    scoop(/**/) {
        var args = Array.from(arguments);
        var stuff = this.copy();

        if (args[0] instanceof Array) args = args[0];
		
        this.content = Soup.from(this.content).filter( (value, index) => {
            if (args[0] instanceof Function) return !args[0](value, index);
            return !args.includes(index) && !args.includes(value);
        }).join("");
        
		return stuff;
    }
	scoopChar(/**/) { return this.scoop( ...Array.from(arguments) ); }
	scoopChars(/**/) { return this.scoop( ...Array.from(arguments) ); }


	// scoopWord
    scoopWord(/**/) {
        var args = Array.from(arguments);
        var stuff = this.copy();

        if (args[0] instanceof Array) args = args[0];
		
        this.content = Soup.from(this.content, " ").filter( (value, index) => {
            if (args[0] instanceof Function) return !args[0](value, index);
            return !args.includes(index) && !args.includes(value);
        }).join(" ");
        
		return stuff;
    }
	scoopWords(/**/) { return this.scoopWord( ...Array.from(arguments) ); }


    // startsWith
    startsWith(/**/) {
        let args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.content;

        for (let i = 0; i < args.length; i++) {
            if (stuff.startsWith(args[i])) return true;
        }
        return false;
    }


    // endsWith
    endsWith(/**/) {
        let args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];
        let stuff = this.content;

        for (let i = 0; i < args.length; i++) {
            if (stuff.endsWith(args[i])) return true;
        }
        return false;
    }


    // toUpperCase
    toUpperCase(/**/) {
		let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		let stuff = this.copy();

		if (args.length > 0) {
			args.forEach( (i) => {
				let thing = Soup.from(stuff.content);
				thing[i] = thing[i].toUpperCase();
				stuff.content = thing.join("");
				
			});
		}
		else {
			stuff.content = stuff.content.toUpperCase();
		}
		
		return new this.constructor(stuff);
    }


    // toLowerCase
    toLowerCase(/**/) {
        let args = Array.from(arguments);
		if (args[0] instanceof Array) args = args[0];
		let stuff = this.copy();

		if (args.length > 0) {
			args.forEach( (i) => {
				let thing = Soup.from(stuff.content);
				thing[i] = thing[i].toLowerCase();
				stuff.content = thing.join("");
				
			});
		}
		else {
			stuff.content = stuff.content.toLowerCase();
		}
		
		return new this.constructor(stuff);
    }


    // replace
    replace(entry, replaceWith) {
		let thing = this.copy();
		thing.content = thing.content.replace(entry, replaceWith);
        return new this.constructor(thing);
    }
    replaceOne(entry, replaceWith) { return this.replace(entry, replaceWith); }


    // replaceAll
    replaceAll(entry, replaceWith) {
		let thing = this.copy();
        for (let i = 0; i < thing.content.length; i++) thing.content = thing.content.replace(entry, replaceWith);

		return new this.constructor(thing);
    }


    // append
    append(index, value) {
        var stuff;
		stuff = new Soup(Array);
		
		this.content.split("").forEach( (v, i) => {
			if (i == index) stuff.push(value);
			stuff.push(v);
		});

		this.content = stuff.join("");

		return this;
    }
    insert(index, value) { return this.append(index, value); }
    push_to(index, value) { return this.append(index, value); }
    push_at(index, value) { return this.append(index, value); }


    // split
    split(/**/) {
        var args = Array.from(arguments);
        if (args[0] instanceof Array) args = args[0];

		let stuff = new Soup([this.content]);
		stuff = stuff.split(args);

		return stuff;
    }


    // trim
    trim() {
		let stuff = this.copy();
		stuff.content = stuff.content.trim();
        return stuff;
    }

	// trimStart
    trimStart() {
		let stuff = this.copy();
		stuff.content = stuff.content.trimStart();
        return stuff;
    }

	// trimEnd
    trimEnd() {
		let stuff = this.copy();
		stuff.content = stuff.content.trimEnd();
        return stuff;
    }


	// merge
	merge(joiner=",", /**/) {
		var args = Array.from(arguments);
		args.shift();

		let stuff = this.copy();
		
        if (args[0] instanceof Array) args = args[0];

		for (let obj of args) {
			let thing = new Noodle(obj);

			stuff.content = stuff.content.concat(joiner, thing.content);
		}

		return stuff;
	}
	concat(joiner=",", /**/) { return this.merge( ...Array.from(arguments)); }


	// compare
	compare(x) {
		return this.content.localeCompare(x);
	}
	localeCompare(x) { return this.compare(x); }


	// match
	match(match) {
		return this.content.match(match);
	}

	
	// padStart
	padEnd(length, string) {
		let stuff = this.copy();
		stuff.content = stuff.content.padStart(length, string);
		return stuff;
	}


	// padEnd
	padEnd(length, string) {
		let stuff = this.copy();
		stuff.content = stuff.content.padEnd(length, string);
		return stuff;
	}


	// search
	search(value) {
		return this.content.search(value);
	}

	
	// slice
	slice(start, end) {
		let stuff = this.copy();
		stuff.content = stuff.content.slice(start, end);
		return stuff;
	}


	// sub
	sub(start, length) {
		let stuff = this.copy();
		stuff.content = stuff.content.substr(start, length);
		return stuff;
	}


	// substring
	substring(start, end) {
		let stuff = this.copy();
		stuff.content = stuff.content.substring(start, end);
		return stuff;
	}
	substr(start, end) { return this.substring(start, end); }


	// toString
	toString() {
		return this.content;
	}


    // copy
    copy() {
        return new this.constructor(this);
    }


    // properties
    get properties() {
        let proto = Noodle.prototype;
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
            else if ( Noodle.primaryInfo.includes(name) ) {
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
            return Noodle.primaryInfo.includes(entry[0]);
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
        if (hint === "string" || hint == "default") {
            return this.content;
        }
        else if (hint == "number") {
            return Number(this.content);
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
                    let data = stuff.get(this.current++);
                    return { done: false, value: data };
                } else {
                    return { done: true };
                }
            }
        };
    }


    // async iterator ( for await..of )
    [Symbol.asyncIterator]() {
        var stuff = this;
        return {
            current: 0,
            last: stuff.length-1,

            async next() {
                if (this.current <= this.last) {
                    let data = stuff.get(this.current++);
                    return { done: false, value: data };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

function NoodProxyHandler() { return {
	
		get(target, prop) {
            if (Object.getOwnPropertyNames(Noodle.prototype).includes(prop) || target[prop]) { // if it's a function or main thing
                return target[prop];
            }
            else if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it's a number
                return target.get(Number(prop));
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
            return true;
        },
        

        deleteProperty(target, prop) {
            if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it is a number
				target.delete(Number(prop));
                return true;
            }
            else {
                return false;
            }
        }
	};
}


// from
Object.defineProperty( Stew, "from", {
    value: (object, splitter='') => { return new Stew(object, splitter); }
});

Object.defineProperty( Soup, "from", {
    value: (object, splitter='') => { return new Soup(object, splitter); }
});

Object.defineProperty( Noodle, "from", {
    value: (object, joiner=",") => { return new Noodle(object, joiner); }
});


// fromCharCode
Object.defineProperty( Noodle, "fromCharCode", {
    value: (array, joiner=",") => { return new Noodle(String.fromCharCode(...array), joiner); }
});


// fromEntries
Object.defineProperty( Stew, "fromEntries", {
	value: (entries) => { return new Stew(Object.fromEntries(entries)); }
});

Object.defineProperty( Soup, "fromEntries", {
	value: (entries) => { return new Soup(Object.fromEntries(entries)); }
});


// fromDOM
var dom_attributes = [
	"accessKey", "addEventListener", "appendChild", "attributes", "blur", "childElementCount", "childNodes", "children", "classList", "className", "click", "clientHeight", "clientLeft", "clientTop", "clientWidth", "cloneNode", "closest", "compareDocumentPosition", "contains", "contentEditable", "dir", "firstChild", "firstElementChild", "focus", "getAttribute", "getAttributeNode", "getBoundingClientRect", "getElementsByClassName", "getElementsByTagName", "hasAttribute", "hasAttributes", "hasChildNodes", "id", "innerHTML", "innerText", "insertAdjacentElement", "insertAdjacentHTML", "insertAdjacentText", "insertBefore", "isContentEditable", "isDefaultNamespace", "isEqualNode", "isSameNode", "lang", "lastChild", "lastElementChild", "matches", "namespaceURI", "nextSibling", "nextElementSibling", "nodeName", "nodeType", "nodeValue", "normalize", "offsetHeight", "offsetWidth", "offsetLeft", "offsetParent", "offsetTop", "outerHTML", "outerText", "ownerDocument", "parentNode", "parentElement", "previousSibling", "previousElementSibling", "querySelector", "querySelectorAll", "remove", "removeAttribute", "removeAttributeNode", "removeChild", "removeEventListener", "replaceChild", "scrollHeight", "scrollIntoView", "scrollLeft", "scrollTop", "scrollWidth", "setAttribute", "setAttributeNode", "style", "tabIndex", "tagName", "textContent", "title", "toString"
];

Object.defineProperty( Stew, "fromDOM", {
    value: (element, every=false) => {
        var info = new Stew({});

        if (every) {
            dom_attributes.forEach( (attr) => { info.push(attr, element[attr]); });
        }
        else {
            Array.from(element.attributes).forEach( (attr) => { info.push(attr.name, attr); });
        }
        
        info.push("origin", element);
        
        return new Proxy(info, ElementProxyHandler());
    }
});

Object.defineProperty( Soup, "fromDOM", {
    value: (element, every=false) => {
        var info = new Soup({});

        if (every) {
            dom_attributes.forEach( (attr) => { info.push(attr, element[attr]); });
        }
        else {
            Array.from(element.attributes).forEach( (attr) => { info.push(attr.name, attr); });
        }
        
        info.push("origin", element);
        
        return new Proxy(info, ElementProxyHandler());
    }
});

function ElementProxyHandler() {
	return {
		set(target, prop, value) { target.origin[prop] = value; return true; },
		deleteProperty(target, prop) { target.origin.remove(prop); return true; }
	};
}


// parse
Object.defineProperty( Stew, "parse", {
	value: (entries) => {
        if (entries.startsWith("{") && entries.endsWith("}")) return new Stew(JSON.parse(entries));
        else if (entries.startsWith("[") && entries.endsWith("]")) return new Stew(new Function(`return ${entries}`)());
    }
});

Object.defineProperty( Soup, "parse", {
	value: (entries) => {
        if (entries.startsWith("{") && entries.endsWith("}")) return new Soup(JSON.parse(entries));
        else if (entries.startsWith("[") && entries.endsWith("]")) return new Soup(new Function(`return ${entries}`)());
    }
});


// function
class StewFunctionMaker {
    constructor(name, func, primary=false) {
        var stuff = (func instanceof Function) ? func : function() { return func; }

        Object.defineProperty(stuff, "name", { value: name });
        Object.defineProperty( Stew.prototype, name, { value: stuff });

        if (primary) Stew.primaryInfo.push(name);

        return stuff;
    }
}

Object.defineProperties(Stew, {
    "Function": { value: StewFunctionMaker }, "function": { value: StewFunctionMaker },
    "Func": { value: StewFunctionMaker }, "func": { value: StewFunctionMaker}
});


class SoapFunctionMaker {
    constructor(name, func, primary=false) {
        var stuff = (func instanceof Function) ? func : function() { return func; }

        Object.defineProperty(stuff, "name", { value: name });
        Object.defineProperty( Soup.prototype, name, { value: stuff });

        if (primary) Soup.primaryInfo.push(name);

        return stuff;
    }
}

Object.defineProperties(Soup, {
    "Function": { value: SoapFunctionMaker }, "function": { value: SoapFunctionMaker },
    "Func": { value: SoapFunctionMaker }, "func": { value: SoapFunctionMaker}
});


class NoodFunctionMaker {
    constructor(name, func, primary=false) {
        var stuff = (func instanceof Function) ? func : function() { return func; }

        Object.defineProperty(stuff, "name", { value: name });
        Object.defineProperty( Noodle.prototype, name, { value: stuff });

        if (primary) Noodle.primaryInfo.push(name);

        return stuff;
    }
}

Object.defineProperties(Noodle, {
    "Function": { value: NoodFunctionMaker }, "function": { value: NoodFunctionMaker },
    "Func": { value: NoodFunctionMaker }, "func": { value: NoodFunctionMaker}
});


// property
class StewPropertyMaker {
    constructor(name, value, attributes={set:undefined, enumerable:false, configurable:false, primary:false}) {
        var func = (value instanceof Function) ? value : function() { return value; };
        
        Object.defineProperty(func, "name", { value: name });

        Object.defineProperty(Stew.prototype, name, {
            get: func,
            set: attributes.set,
            enumerable: attributes.enumerable,
            configurable: attributes.configurable
        });

        if (attributes.primary) Stew.primaryInfo.push(name);

        return func;
    }
}

Object.defineProperties(Stew, {
    "Property": { value: StewPropertyMaker }, "property": { value: StewPropertyMaker },
    "Prop": { value: StewPropertyMaker }, "prop": { value: StewPropertyMaker }
});


class SoapPropertyMaker {
    constructor(name, value, attributes={set:undefined, enumerable:false, configurable:false, primary:false}) {
        var func = (value instanceof Function) ? value : function() { return value; };
        
        Object.defineProperty(func, "name", { value: name });

        Object.defineProperty(Soup.prototype, name, {
            get: func,
            set: attributes.set,
            enumerable: attributes.enumerable,
            configurable: attributes.configurable
        });

        console.log(Object.getOwnPropertyDescriptors(Soup.prototype)[name].get)

        if (attributes.primary) Soup.primaryInfo.push(name);

        return func;
    }
}

Object.defineProperties(Soup, {
    "Property": { value: SoapPropertyMaker }, "property": { value: SoapPropertyMaker },
    "Prop": { value: SoapPropertyMaker }, "prop": { value: SoapPropertyMaker }
});


class NoodPropertyMaker {
    constructor(name, value, attributes={set:undefined, enumerable:false, configurable:false, primary:false}) {
        var func = (value instanceof Function) ? value : function() { return value; };
        
        Object.defineProperty(func, "name", { value: name });

        Object.defineProperty(Noodle.prototype, name, {
            get: func,
            set: attributes.set,
            enumerable: attributes.enumerable,
            configurable: attributes.configurable
        });

        console.log(Object.getOwnPropertyDescriptors(Noodle.prototype)[name].get)

        if (attributes.primary) Noodle.primaryInfo.push(name);

        return func;
    }
}

Object.defineProperties(Noodle, {
    "Property": { value: NoodPropertyMaker }, "property": { value: NoodPropertyMaker },
    "Prop": { value: NoodPropertyMaker }, "prop": { value: NoodPropertyMaker }
});

Object.defineProperty(Soup, "primaryInfo", {
    value: ["insides", "type", "splitter", "length", "size", "keys", "values", "entries", "constructor"]
});

Object.defineProperty(Stew, "primaryInfo", {
    value: ["insides", "type", "splitter", "length", "size", "keys", "values", "entries", "constructor"]
});

Object.defineProperty(Noodle, "primaryInfo", {
    value: ["content", "joiner", "length", "size", "words", "sections", "wordCount", "constructor"]
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

Number.prototype.brew = function(type=Soup) {
    if (type instanceof Function) type = new type();
    return (type instanceof Soup) ? new Soup( parseInt(this) ) : new Stew( parseInt(this) );
}


// random
var random = {
	int: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	},
	number: function(min, max) {return this.int(min, max)},


	choice: function(object, splitter='') {
		if (typeof object == "string") {
			return object.split(splitter)[Math.floor(Math.random() * (Number(object.split(splitter).length)))];
		}
        else if (object instanceof Array) {
            return object[Math.floor(Math.random() * (Number(object.length)))];
        }
        else if (object instanceof Set) {
            return Array.from(object)[Math.floor(Math.random() * (Number(Array.from(object).length)))];
        }
        else if (object instanceof Map) {
            return Array.from(object.entries())[Math.floor(Math.random() * (Number(Array.from(object.entries()).length)))];
        }
		else if (object instanceof Stew || object instanceof Soup) {
			if (object.type == "pair") return object.entries[Math.floor(Math.random() * (Number(object.length)))];
			else return object[Math.floor(Math.random() * (Number(object.length)))];
		}
        else if (object instanceof Object) {
            return Object.entries(object)[Math.floor(Math.random() * (Number(Object.entries(object).length)))];
        }
	},


    index: function(object, splitter='') {
		if (typeof object == "string") {
			return Math.floor(Math.random() * (Number(object.split(splitter).length)));
		}
        else if (object instanceof Array) {
            return Math.floor(Math.random() * (Number(object.length)));
        }
        else if (object instanceof Set) {
            return Math.floor(Math.random() * (Number(Array.from(object).length)));
        }
        else if (object instanceof Map) {
            return Math.floor(Math.random() * (Number(Array.from(object.entries()).length)));
        }
		else if (object instanceof Stew || object instanceof Soup) {
			return Math.floor(Math.random() * (Number(object.length)));
		}
        else if (object instanceof Object) {
            return Math.floor(Math.random() * (Number(Object.entries(object).length)));
        }
	}
}

Object.defineProperty(Stew.prototype, "random", {
    get() {
        var obj = this;
        return {
            choice: function() {return random.choice(obj.pour())},
            index: function() {return random.int(0, obj.length-1)}
        }
    }
});


Object.defineProperty(Soup.prototype, "random", {
    get() {
        var obj = this;
        return {
            choice: function() {return random.choice(obj.pour())},
            index: function() {return random.int(0, obj.length-1)}
        }
    }
});




try { // check if it's a .js file

	module.exports = { 
        Stew, 
        Soup, 
		Noodle,
        random, 
        StewFunctionMaker, SoapFunctionMaker, NoodFunctionMaker, 
        StewPropertyMaker, SoapPropertyMaker, NoodPropertyMaker
    };

}
	
catch(err) {}
