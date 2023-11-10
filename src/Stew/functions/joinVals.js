const Stew = require('../index.js');


function StewJoinVals(joiner=",") {
    return (this.type == "list") ? Array.from(this.insides).join(joiner) : this.values.join(joiner);
}


Stew.newF("joinVals", StewJoinVals);
