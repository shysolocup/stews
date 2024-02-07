const Stew = require('@stews/stew');
const Soup = require('@stews/soup');
const Noodle = require('@stews/noodle');
const Bean = require('../index.js');


module.exports = function __form(object, joiner) {

    function parse(obj) {
        return parseFloat(obj.split("").filter( i => !(("1234567890.".split("")).includes(i)) ).join(""))
    }
    
    
    // fixes uninitiated class
    if (object instanceof Function) object = new object();


        /* == MISC == */
    

    // if instance is a stew or soup
    // gets content of the stew/soup
    if (object instanceof Stew || object instanceof Soup) {
        object = parseFloat(object.join(joiner));
    }


    // if instance is a noodle
    // gets content of the noodle
    if (object instanceof Noodle) {
        object = object.content;
    }


    if (object instanceof Bean) {
        object = object.content;
    }


    // if object is not given
    // defaults to a blank string
    if (!object) {
        this.content = 0;
    }


    // if instance is a string
    // nothing interesting happens
    else if (typeof object == "string") {
        this.content = parse(object);
    }



    // if instance is a number
    // turn into string
    else if (typeof object == "number") {
        this.content = object
    }


        /* == TYPES == */

        
    // if instance is an array
    // join array into a string
    else if (object instanceof Array) {
        this.content = parse(object.join(joiner));
    }


    // if instance is a set
    // turn the set into an array then join
    else if (object instanceof Set) {
        this.content = parse(Array.from(object).join(joiner));
    }


    // if instance is a map
    // turn the map into a soup then join
    else if (object instanceof Map || object instanceof Object) {
        this.content = parse(Soup.from(object).join(joiner));
    }
}
