const Soup = require('../index.js');


function SoupJoinVals(joiner=",") {
    return (this.type == "list") ? this.insides.join(joiner) : this.values.join(joiner);
}


Soup.newF("joinVals", SoupJoinVals);
