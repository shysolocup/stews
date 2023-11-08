const Stew = require('../index.js');


function StewToJSON() {
    return this.pour(Object);
}


Stew.newF("toJSON", StewToJSON);
