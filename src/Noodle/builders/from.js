const Noodle = require('../index.js');


Object.defineProperty( Noodle, "from", {
    value: (object, joiner='') => { return new Noodle(object, joiner); }
});
