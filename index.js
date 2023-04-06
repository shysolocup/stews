/* :: Stews :: Version 1.4.6 | 04/06/23 :: */

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
            get() { return new String(splitter); }
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
    unshift(entry) { return this.pull(entry); }


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


    // keyOf
    valueOf(entry) {
        if (this.type == "pair") return this.values[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return Array.from(this.insides)[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // indexOf
    indexOf(entry) {
        if (this.type == "pair") return this.keys.indexOf(entry);
        else if (this.type == "list") return Array.from(this.insides).indexOf(entry);
    }
    indexOfKey(entry) { return this.indexOf(entry); }
    findFirst(entry) { return this.indexOf(entry); }
    

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
    fetch(entry) { return this.get(entry); }
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
    sort(func=null) {

        /*
            "the dumbass shit below is so that it can check the stuff in the function to see if it needs to reverse
             please ignore how absolutely dog shit it is"

            - Megan "meg" "nut" "nutmeg" "nuttmegg" The Nut | 04/03/2023
        */

        function stupid(dumb) {
            let args = Soup.from(dumb.toString(), ",");
            args.replaceAll("(", "");
            args.replaceAll(")", "");
            args.replaceAll(" ", "");
            args[1] = args[1].split("{");
            args[1][0] = args[1][0].replace("=>", "");
            args[1] = args[1][0];

            const [ [a], [b]] = args;

            let fixedString = dumb.toString().replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1')
            let fixed = Soup.from(fixedString.substring(fixedString.indexOf('{')+1, fixedString.lastIndexOf('}')));

            fixed.scoop("\n");
            fixed.scoop(";");
            fixed.scoop(" ");

            return fixed.join("") == `return${b}-${a}`;
        }

        if (this.type == "pair") {
            let thing = this.entries;

            if (func && stupid(func)) {
                thing = thing.sort();
                this.insides = new Map( thing.reverse() );
            }
            else {
                this.insides = new Map( (func) ? thing.sort(func) : thing.sort() );
            }
        }
        else if (this.type == "list") {
            if (func && stupid(func)) {
                this.insides = new Set(Array.from(this.insides).sort());
                this.insides = new Set(Array.from(this.insides).reverse());

            }
            else {
                this.insides = new Set((func) ? Array.from(this.insides).sort(func) : Array.from(this.insides).sort());
            }
        }

        return this;
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

            fs.writeFileSync(file, this.stringify(replacer, indent));

            return Stew.parse(fs.readFileSync(file, 'utf8'));
        }
        catch(err) {}
    }


    // merge
    merge(/**/) {
        var args = arguments;
        var stuffs = this;

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
    findIndexesOf(entry, exact=false) { return this.find(entry, exact); }
    findIndexes(entry, exact=false) { return this.find(entry, exact); }
    indexesOf(entry, exact=false) { return this.find(entry, exact); }


    // lastIndexOf
    lastIndexOf(key) {
        let stuff = this.find(key);
        return stuff[stuff.length-1];
    }
    findLast(key) { return this.lastIndexOf(key); }


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
        var stuff = this;
        if (stuff.type == "list") {
            stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
            });
        }
        else if (stuff.type == "pair") {
            stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
                if (typeof key == "string") stuff.rename(index, key.toUpperCase());
            });
        }
        return stuff;
    }


    // toLowerCase
    toLowerCase() {
        var stuff = this;
        if (stuff.type == "list") {
            stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
            });
        }
        else if (stuff.type == "pair") {
            stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
                if (typeof key == "string") stuff.rename(index, key.toLowerCase());
            });
        }
        return stuff;
    }


    // replace
    replace(entry, replaceWith) {
        let thing = this;
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


    // replaceAll
    replaceAll(entry, replaceWith) {
        let thing = this;
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
            else if ( ["length", "size", "keys", "values", "entries"].includes(name) ) {
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
            return ["insides", "type", "splitter", "length", "size", "keys", "values", "entries", "constructor"].includes(entry[0]);
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
                return target[prop] = value;
            }
            else if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it's a number
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
            get() { return new String(splitter); }
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
    unshift(entry) { return this.pull(entry); }


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


    // keyOf
    valueOf(entry) {
        if (this.type == "pair") return this.values[ (typeof entry == "string") ? this.indexOf(entry) : entry];
        else if (this.type == "list") return this.insides[ (typeof entry == "string") ? this.indexOf(entry) : entry ];
    }


    // indexOf
    indexOf(entry) {
        if (this.type == "pair") return this.keys.indexOf(entry);
        else if (this.type == "list") return this.insides.indexOf(entry);
    }
    indexOfKey(entry) { return this.indexOf(entry); }
    findFirst(entry) { return this.indexOf(entry); }


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
    fetch(entry) { return this.get(entry); }
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
    sort(func=null) {

        /*
            "the dumbass shit below is so that it can check the stuff in the function to see if it needs to reverse
             please ignore how absolutely dog shit it is"

            - Megan "meg" "nut" "nutmeg" "nuttmegg" The Nut | 04/03/2023
        */

        function stupid(dumb) {
            let args = Soup.from(dumb.toString(), ",");
            args.replaceAll("(", "");
            args.replaceAll(")", "");
            args.replaceAll(" ", "");
            args[1] = args[1].split("{");
            args[1][0] = args[1][0].replace("=>", "");
            args[1] = args[1][0];

            const [ [a], [b]] = args;

            let fixedString = dumb.toString().replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1')
            let fixed = Soup.from(fixedString.substring(fixedString.indexOf('{')+1, fixedString.lastIndexOf('}')));

            fixed.scoop("\n");
            fixed.scoop(";");
            fixed.scoop(" ");

            return fixed.join("") == `return${b}-${a}`;
        }

        if (this.type == "pair") {
            let thing = this.entries;

            if (func && stupid(func)) {
                thing = thing.sort();
                this.insides = Object.fromEntries( thing.reverse() );
            }
            else {
                this.insides = Object.fromEntries( (func) ? thing.sort(func) : thing.sort() );
            }
        }
        else if (this.type == "list") {
            if (func && stupid(func)) {
                this.insides = this.insides.sort();
                this.insides = this.insides.reverse();
            }
            else {
                this.insides = (func) ? this.insides.sort(func) : this.insides.sort();
            }
        }

        return this;
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

            fs.writeFileSync(file, this.stringify(replacer, indent));

            return Soup.parse(fs.readFileSync(file, 'utf8'));
        }
        catch(err) {}
    }


    // merge
    merge(/**/) {
        var args = arguments;
        var stuffs = this;

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
    findIndexesOf(entry, exact=false) { return this.find(entry, exact); }
    findIndexes(entry, exact=false) { return this.find(entry, exact); }
    indexesOf(entry, exact=false) { return this.find(entry, exact); }


    // lastIndexOf
    lastIndexOf(key) {
        let stuff = this.find(key);
        return stuff[stuff.length-1];
    }
    findLast(key) { return this.lastIndexOf(key); }


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
        var stuff = this;
        if (stuff.type == "list") {
            stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
            });
        }
        else if (stuff.type == "pair") {
            stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toUpperCase());
                if (typeof key == "string") stuff.rename(index, key.toUpperCase());
            });
        }
        return stuff;
    }


    // toLowerCase
    toLowerCase() {
        var stuff = this;
        if (stuff.type == "list") {
            stuff.forEach( (value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
            });
        }
        else if (stuff.type == "pair") {
            stuff.forEach( (key, value, index) => {
                if (typeof value == "string") stuff.set(index, value.toLowerCase());
                if (typeof key == "string") stuff.rename(index, key.toLowerCase());
            });
        }
        return stuff;
    }


    // replace
    replace(entry, replaceWith) {
        let thing = this;
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


    // replaceAll
    replaceAll(entry, replaceWith) {
        let thing = this;
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
            else if ( ["length", "size", "keys", "values", "entries"].includes(name) ) {
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
            return ["insides", "type", "splitter", "length", "size", "keys", "values", "entries", "constructor"].includes(entry[0]);
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
                return target[prop] = value;
            }
            else if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it's a number
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


// from
Object.defineProperty( Stew, "from", {
    value: (object, splitter='') => { return new Stew(object, splitter); }
});

Object.defineProperty( Soup, "from", {
    value: (object, splitter='') => { return new Soup(object, splitter); }
});


// fromEntries
Object.defineProperty( Stew, "fromEntries", {
	value: (entries) => { return new Stew(Object.fromEntries(entries)); }
});

Object.defineProperty( Soup, "fromEntries", {
	value: (entries) => { return new Soup(Object.fromEntries(entries)); }
});


// waa waa I hate js


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
    constructor(name, func) {
        if (func instanceof Function) {
            var stuff = func.toString();
            if (!stuff.startsWith("function")) stuff = `function${stuff.replace("=>", "")}`;
            stuff = new Function(` return ${stuff}` )();
            Object.defineProperty(stuff, "name", { value: name });

            Stew.prototype[name] = stuff;
            return stuff;
        }
        else {
            var stuff = function() { return func; };
            Object.defineProperty(stuff, "name", { value: name });
            
            Object.defineProperty( Stew.prototype, name, { value: stuff });
            return stuff;
        }
    }
}

Object.defineProperties(Stew, {
    "Function": { value: StewFunctionMaker }, "function": { value: StewFunctionMaker },
    "Func": { value: StewFunctionMaker }, "func": { value: StewFunctionMaker}
});

class SoupFunctionMaker {
    constructor(name, func) {
        if (func instanceof Function) {
            var stuff = func.toString();
            if (!stuff.startsWith("function")) stuff = `function${stuff.replace("=>", "")}`;
            stuff = new Function(` return ${stuff}` )();
            Object.defineProperty(stuff, "name", { value: name });

            Soup.prototype[name] = stuff;
            return stuff;
        }
        else {
            var stuff = function() { return func; };
            Object.defineProperty(stuff, "name", { value: name });
            
            Object.defineProperty( Soup.prototype, name, { value: stuff });
            return stuff;
        }
    }
}

Object.defineProperties(Soup, {
    "Function": { value: SoupFunctionMaker }, "function": { value: SoupFunctionMaker },
    "Func": { value: SoupFunctionMaker }, "func": { value: SoupFunctionMaker}
});


// property
class StewPropertyMaker {
    constructor(name, value, attributes={set:undefined, writable:true, enumerable:false, configurable:false}) {
        if (value instanceof Function) { 
            var stuff = value.toString();
            if (!stuff.startsWith("function") && stuff.endsWith("}")) stuff = `function${stuff.replace("=>", "")}`;
            var func = new Function(`return ${stuff}`)();
        }
        else {
            var func = function() { return value }
        }
        
        Object.defineProperty(func, "name", { value: name });

        Object.defineProperty(Stew.prototype, name, { 
            get: func, 
            set: attributes.set,
            writable: attributes.writable,
            enumerable: attributes.enumerable,
            configurable: attributes.configurable
        });
        return func;
    }
}

Object.defineProperties(Stew, {
    "Property": { value: StewPropertyMaker }, "property": { value: StewPropertyMaker },
    "Prop": { value: StewPropertyMaker }, "prop": { value: StewPropertyMaker }
});

class SoupPropertyMaker {
    constructor(name, value, attributes={set:undefined, writable:true, enumerable:false, configurable:false}) {
        if (value instanceof Function) { 
            var stuff = value.toString();
            if (!stuff.startsWith("function") && stuff.endsWith("}")) stuff = `function${stuff.replace("=>", "")}`;
            var func = new Function(`return ${stuff}`)();
        }
        else {
            var func = function() { return value }
        }
        
        Object.defineProperty(func, "name", { value: name });

        Object.defineProperty(Soup.prototype, name, { 
            get: func,
            set: attributes.set,
            writable: attributes.writable,
            enumerable: attributes.enumerable,
            configurable: attributes.configurable
        });
        return func;
    }
}

Object.defineProperties(Soup, {
    "Property": { value: SoupPropertyMaker }, "property": { value: SoupPropertyMaker },
    "Prop": { value: SoupPropertyMaker }, "prop": { value: SoupPropertyMaker }
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

	module.exports = { Stew, Soup, random };

} 
catch(err) {}
