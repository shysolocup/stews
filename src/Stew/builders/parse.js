const Stew = require('../index.js');


Object.defineProperty( Stew, "parse", {
	value: (entries) => {
        if (entries.startsWith("{") && entries.endsWith("}")) return new Stew(JSON.parse(entries));
        else if (entries.startsWith("[") && entries.endsWith("]")) return new Stew(new Function(`return ${entries}`)());
    }
});
