const prox = require('../index.js');


prox.deleteProperty = (target, prop) => {
    return target.delete(prop);
}
