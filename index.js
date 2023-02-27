class Random {
    constructor(insides, type) {
        this.insides = insides;
        this.type = type;
    }
    
    key() {
        return Array.from(this.insides.keys()) [Math.floor(Math.random() * (Array.from(this.insides.keys()).length))];
    }
    
    value() {
        return Array.from(this.insides.values()) [Math.floor(Math.random() * (Array.from(this.insides.values()).length))];
    }
    
    choice() {
        let index = Math.floor(Math.random() * (Array.from(this.insides.entries()).length))
    	let thing = Array.from(this.insides.entries()) [index];
    	if (this.type == "set") return { value: thing[0], index: index };
    	else if (this.type == "map") return { key: thing[0], value: thing[1], index: index };
    }
}


class Rego {
    constructor(object) {
        if (!object) {
            this.insides = new Set();
            this.type = "set";
        }
        else if (object instanceof Array) {
            this.insides = new Set(object);
            this.type = "set";
        }
        else if (Object.keys(object)[0]) {
            this.insides = new Map(Object.entries(object));
            this.type = "map";
        }
        else if (object instanceof Map) {
            this.insides = object;
            this.type = "map";
        }
        else if (object instanceof Set) {
            this.insides = object;
            this.type = "set";
        }
        
        this.RandomHandler();
    }
    
    
    // length
    get length() {
        return this.insides.size;
    }
    get size() { return this.length; }
    
    
    // push
    push(variable, value=null) {
        if (this.type == "set") return this.insides.add(variable);
        else if (this.type == "map") return this.insides.set(variable, value);
    }
    add(variable, value=null) { return this.push(variable, value); }
    set(variable, value=null) { return this.push(variable, value); }
    
    
    // indexOf
    indexOf(name) {
        return Array.from(this.insides.keys()).indexOf(name);
    }
    
    
    // fetch
    fetch(entry) {
        if (this.type == "map") {
            if (typeof entry == "string") {
                return { key: entry, value: this.insides.get(entry), index: Array.from(this.insides.keys()).indexOf(entry) };
            }
            else if (typeof entry == "number") {
                return { key: Array.from(this.insides.keys())[entry], value: Array.from(this.insides.values())[entry], index: entry };
            }
        }
        else if (this.type == "set") {
            if (typeof entry == "string") {
                return { value: entry, index: Array.from(this.insides).indexOf(entry) };
            }
            else if (typeof entry == "number") {
                return { value: Array.from(this.insides)[entry], index: entry };
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
    toArray() { return this.list(); }
    arrayify() { return this.list(); }
    
    
    // pair
    pair() {
        return Object.fromEntries(Array.from(this.insides));
    }
    toPair() { return this.pair(); }
    toObject() { return this.pair(); }
    objectify() { return this.pair(); }
    
    
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
    
    
    // random
    random;
    
    RandomHandler() {
        this.random = new Random(this.insides, this.type);
    }
}

module.exports = { Rego, Random }
