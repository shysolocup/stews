const Soup = require('../index.js');


Soup.newF(Symbol.toPrimitive, function(hint) {
    if (hint === "string") {
        return this.toString();
    }
    else if (hint == "number") {
        return Number(this.join(""));
    }
    return this;
});
