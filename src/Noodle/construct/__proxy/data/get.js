const prox = require('../index.js');
const Soup = require('../../../index.js');


prox.get = (target, prop) => {
    try {
                if (Object.getOwnPropertyNames(Noodle.prototype).includes(prop) || target[prop]) { // if it's a function or main thing
                    return target[prop];
                }
                else if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it's a number
                    return target.get(Number(prop));
                }
                else {
                    return false;
                }
            } catch(e) {
                return target[prop];
            }
};
