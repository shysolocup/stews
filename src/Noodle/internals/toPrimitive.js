const Noodle = require('../index.js');


Noodle.newF(Symbol.toPrimitive, function(hint) {
    if (hint === "string" || hint == "default") {
            return this.content;
        }
        else if (hint == "number") {
            return Number(this.content);
		}
        return this;
});
