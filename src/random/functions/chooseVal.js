const random = require('../index.js');
const Soup = require('@stews/soup');
const Noodle = require('@stews/noodle');


function RandomValueChoice(object=null) {
    if (!object && this.binder) object = this.binder;
    
    // if object is a string
    // split then randomly choose
    if (typeof object == "string") {
        return object.split(splitter)[Math.floor(Math.random() * (Number(object.split(splitter).length)))];
    }


    // if it's object is an object
    // turns it into a soup and then randomly chooses
    else if (typeof object == "object" && !(object instanceof Noodle)) {
        object = Soup.from(object);
        let index = Math.floor(Math.random() * (object.length));
        
        return (object.type == "list") ? 
            object.get(index) :
            object.values[index]
    }


    // if object is a noodle
    // gets a random character
    else if (object instanceof Noodle) {
        return object.get(Math.floor(Math.random() * (object.length)));
    }
}


random.newF("chooseVal", RandomValueChoice);
