const Stew = require('../index.js');


Stew.newF(Symbol.iterator, function() {
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
});
