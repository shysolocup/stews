const Stew = require('../index.js');


Stew.newF(Symbol.toPrimitive, function(hint) {
    if (hint === "string") {
        return this.toString();
    }
    else if (hint == "number") {
        return Number(this.join(""));
    }
    return this;
});
