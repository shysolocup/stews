const Stew = require('../index.js');


function StewAppend(index, key, value=null) {
	var stuff;
  if (this.type == "list") {
      stuff = new Stew(Array);
      this.forEach( (v, i) => {
          if (i == index) stuff.push(key);
          stuff.push(v);
      });

      this.insides = stuff.pour(Set);
  }
  else if (this.type == "pair") {
      stuff = new Stew(Object);
      this.forEach( (k, v, i) => {
          if (i == index) stuff.push(key, value);
          stuff.push(k, v);
      });

      this.insides = stuff.pour(Map);
  }
}


Stew.newF("append", StewAppend);
Stew.newF("insert", StewAppend);
Stew.newF("push_at", StewAppend);
Stew.newF("push_to", StewAppend);
