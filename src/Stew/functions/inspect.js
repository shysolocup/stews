const Stew = require('../index.js');


function StewInspect(depth, opts) {
  return `Soup(${this.length}) { ${this.insides} }`;
}


Stew.newF("inspect", StewInspect);
