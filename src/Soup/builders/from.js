const Soup = require('../index.js');


Object.defineProperty( Soup, "from", {
    value: (...args) => { return new Soup(...args); }
});
