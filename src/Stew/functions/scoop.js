const Stew = require('../index.js');


function StewScoop(/**/) {
	var args = Array.from(arguments);
        var stuff = Stew.from(this);

        if (args[0] instanceof Array) args = args[0];

        if (this.type == "list") {
            this.insides = this.filter( (value, index) => {
                if (args[0] instanceof Function) return !args[0](value, index);
                return !args.includes(index) && !args.includes(value);
            }).pour(Set);
            return stuff;
        }
        
        else if (this.type == "pair") {
            this.insides = this.filter( (key, value, index) => {
                if (args[0] instanceof Function) return !args[0](key, value, index);
                return !args.includes(index) && !args.includes(key);
            }).pour(Map);
            return stuff;
        }
}


Stew.newF("scoop", StewScoop);
