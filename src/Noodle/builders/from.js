const Noodle = require('../index.js');


Object.defineProperty( Noodle, "from", {
    value: (...args) => { return new Noodle(...args); }
});
