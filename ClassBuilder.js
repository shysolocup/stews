function ClassBuilder(c) {
	
	// Function Maker
	class FunctionMaker {
    	constructor(name, func) {
	        var stuff = (func instanceof Function) ? func : function() { return func; }
	
	        Object.defineProperty(stuff, "name", { value: name });
	        Object.defineProperty( c.prototype, name, { value: stuff });
	
	        return stuff;
	    }
	}

	
	// Property Maker
	class PropertyMaker {
	    constructor(name, value, attributes={set:undefined, enumerable:false, configurable:false}) {
	        var func = (value instanceof Function) ? value : function() { return value; };
	        
	        Object.defineProperty(func, "name", { value: name });
	        Object.defineProperty(c.prototype, name, {
	            get: func,
	            set: attributes.set,
	            enumerable: attributes.enumerable,
	            configurable: attributes.configurable
	        });
	
	        return func;
	    }
	}


	// Class Maker
	class ClassMaker {
	    constructor(name, value) {
	        var cl = ClassBuilder(
				(value instanceof Function) ? value : class { constructor() { return value; } } 
			);

	        Object.defineProperty(cl, "name", { value: name });
	        Object.defineProperty(c.prototype, name, { 
				get() {
					cl.prototype.parent = this;
					return cl;
				}
			});
	
	        return cl;
	    }
	}

	
	Object.defineProperties(c, {
	    "Function": { value: FunctionMaker }, "function": { value: FunctionMaker },
	    "Func": { value: FunctionMaker }, "func": { value: FunctionMaker}
	});


	Object.defineProperties(c, {
	    "Property": { value: PropertyMaker }, "property": { value: PropertyMaker },
	    "Prop": { value: PropertyMaker }, "prop": { value: PropertyMaker }
	});


	Object.defineProperties(c, {
	    "Class": { value: ClassMaker }, "class": { value: ClassMaker }
	});

	
	return c;
}


module.exports = ClassBuilder;
