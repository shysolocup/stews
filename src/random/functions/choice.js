const random = require('../index.js');
const Soup = require('@stews/soup');
const Noodle = require('@stews/noodle');


function RandomChoice(object) {
    
    // if object is a string
    // split then randomly choose
    if (typeof object == "string") {
        return object.split(splitter)[Math.floor(Math.random() * (Number(object.split(splitter).length)))];
    }

    else if (typeof object == "object" && !(object instanceof Noodle)) {
        object = Soup.from(object);
        let index = Math.floor(Math.random() * (object.length))
        return (object.type == "list") ? 
            object.get(index) :
            object.entries[index]
    }
}


random.newF("choice", RandomChoice);
