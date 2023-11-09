const Soup = require('../index.js');
const util = require('util');


Soup.prototype[util.inspect.custom] = function(depth, opts) {
  let data;
  if (this.type == "list") {
    data = `[ ${this.map( v => `${
      (typeof v == "string") ? `"${v}"` :
      (typeof v == "object") ? `[${v.constructor.name}]` :
      v
    }`).join(", ")} ]`;
  }
    
  else if (this.type == "pair") {
    data = `{ ${this.entries.map( v => `${

            (typeof v[0] == "string" && v[0].includes(" ")) ? `"${v[0]}"` : v[0]

        }: ${

        (typeof v[1] == "object") ? `[${v[1].constructor.name}]` : 
        (typeof v[1] == "string")?  `"${v[1]}"`
        : v[1]

    }`).flat().join(", ")} }`
  }
  
  return `Soup(${this.length}) ${data}`;
}
