const Soup = require('../index.js');


Object.defineProperty( Soup, "parse", {
	value: (entries) => {
        if (entries.startsWith("{") && entries.endsWith("}")) return new Soup(JSON.parse(entries));
        else if (entries.startsWith("[") && entries.endsWith("]")) return new Soup(new Function(`return ${entries}`)());
    }
});
