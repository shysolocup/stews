const Bean = require('../index.js');


Object.defineProperty( Bean, "from", {
    value: (...args) => { return new Bean(...args); }
});
