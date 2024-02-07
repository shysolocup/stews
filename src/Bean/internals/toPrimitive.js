const Bean = require('../index.js');


Bean.newF(Symbol.toPrimitive, function(hint) {
    if (hint === "string" || hint == "default") {
            return this.toString();
        }
        else if (hint == "number") {
            return Number(this.content);
		}
        return this;
});
