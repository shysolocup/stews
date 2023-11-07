const Soup = require('../index.js');


function SoupToJSON() {
    return this.pour(Object);
}


Soup.newF("toJSON", SoupToJSON);
