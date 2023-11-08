const random = require('../index.js');
const Soup = require('@stews/soup');
const Noodle = require('@stews/noodle');


function RandomIndex(object) {
    
    // if object is a string
    // split then randomly choose an index
    if (typeof object == "string") {
        return Math.floor(Math.random() * (Number(object.split(splitter).length)));
    }


    // if it's object is an object
    // turns it into a soup and then randomly chooses an index
    else if (typeof object == "object" && !(object instanceof Noodle)) {
        object = Soup.from(object);
        return Math.floor(Math.random() * (object.length));
    }


    // if object is a noodle
    // gets a random index character
    else if (object instanceof Noodle) {
        return Math.floor(Math.random() * (object.length));
    }
}


random.newF("index", RandomIndex);
