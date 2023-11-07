const Stew = require('../index.js');


Object.defineProperty( Stew, "from", {
    value: (object, splitter='') => { return new Stew(object, splitter); }
});
