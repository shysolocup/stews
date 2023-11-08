const Noodle = require('../index.js');


function NoodlePop(offset=0) {
	let index = (this.length-1)-offset;
  let returns = { value: this.get(index), index: index };
  this.delete(index);
  return returns;
}


Noodle.newF("pop", NoodlePop);
Noodle.newF("unpush", NoodlePop);
