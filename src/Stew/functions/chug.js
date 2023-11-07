const Stew = require('../index.js');


function StewChug(func) {
	if (this.type == "pair") {
      for (let i = 0; i < this.length; i++) {
          if (!func(this.keys[i], this.values[i], i)) return false;
      }
  }
  else if (this.type == "list") {
      for (let i = 0; i < this.length; i++) {
          if (!func(Array.from(this.insides)[i], i)) return false;
      }
  }

  return true;
}


Stew.newF("chug", StewChug);
Stew.newF("every", StewChug);
