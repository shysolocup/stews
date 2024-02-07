const prox = require('../index.js');


prox.set = (target, prop, value) => {
    if (target[prop]) {
        target[prop] = value;
    }
    else {
        target.set(prop, value);
    }

    return true;
}
