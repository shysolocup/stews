const Bean = require('../index.js');


Bean.newF(Symbol.toPrimitive, function(hint) {
    if (hint === "string") {
            return this.toString();
        }
        else if (hint == "number" || hint == "default") {
            return this.content;
		}
        return this;
});
