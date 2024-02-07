const prox = require('../index.js');
const Bean = require('../../../index.js');


prox.get = (target, prop) => {
    try {
        if (Object.getOwnPropertyNames(Bean.prototype).includes(prop) || target[prop]) {
            return target[prop]
        }
        else {
            return target.get(prop);
        }
    }
    catch(e) {
        return target[prop];
    }
}
