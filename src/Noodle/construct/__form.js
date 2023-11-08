const Stew = require('@stews/stew');
const Soup = require('@stews/soup');
const Noodle = require('../index.js');


module.exports = function __form(object, joiner) {
    
    // fixes uninitiated class
    if (object instanceof Function) object = new object();


        /* == MISC == */
    

    // if instance is a stew or soup
    // gets content of the stew/soup
    if (object instanceof Stew || object instanceof Soup) {
        object = object.join(joiner);
    }


    // if instance is a noodle
    // gets content of the noodle
    if (object instanceof Noodle) {
        object = object.content;
        joiner = (joiner != object.joiner) ? joiner : object.joiner;
    }


    // if object is not given
    // defaults to a blank string
    if (!object) {
        this.content = "";
    }


    // if instance is a string
    // nothing interesting happens
    else if (typeof object == "string") {
        this.content = object;
    }



    // if instance is a number
    // turn into string
    else if (typeof object == "number") {
        this.content = object.toString();
    }


        /* == TYPES == */

        
    // if instance is an array
    // join array into a string
    else if (object instanceof Array) {
        this.content = object.join(joiner);
    }


    // if instance is a set
    // turn the set into an array then join
    else if (object instanceof Set) {
        this.content = Array.from(object).join(joiner);
    }


    // if instance is a map
    // turn the map into a soup then join
    else if (object instanceof Map || object instanceof Object) {
        this.content = Soup.from(object).join(joiner);
    }
}
