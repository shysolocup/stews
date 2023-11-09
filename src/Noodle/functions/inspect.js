const Noodle = require('../index.js');


function NoodleInspect(depth, opts) {
  return `Noodle(${this.length}) { ${this.contents} }`;
}


Noodle.newF("inspect", NoodleInspect);
