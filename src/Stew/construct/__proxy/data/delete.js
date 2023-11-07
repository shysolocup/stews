const prox = require('../index.js');


prox.deleteProperty = (target, prop) => {
    if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it is a number
        if (target.type == "pair") {
            target.insides = new Map(target.entries.filter( (value, index) => {
                return index != Number(prop);
            }));
            return true;
        }
        else if (target.type == "list") {
            target.insides = new Set(target.insides.filter( (value, index) => {
                return index != Number(prop);
            }));
            return true;
        }
    }
    else if (typeof prop == "string") { // if it is a string
        if (target.type == "pair") {
            target.insides = new Map(target.entries.filter( (value, index) => {
                return value[0] != prop;
            }));
            return true;
        }
        else if (target.type == "list") {
            target.insides = new Set(target.insides.filter( (value) => {
                return value != prop;
            }));
            return true;
        }
    }
    else {
        return false;
    }
};
