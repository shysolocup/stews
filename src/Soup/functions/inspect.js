const Soup = require('../index.js');


function SoupInspect(depth, opts) {
  return `Soup(${this.length}) { ${this.insides} }`;
}


Soup.newF("inspect", SoupInspect);
