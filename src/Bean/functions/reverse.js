const Bean = require('../index.js');


function BeanReverse() {
  let copy = this.copy();
  copy.content = parseFloat(copy.content.toString().split("").reverse().join(""));
  return copy;
}


Bean.newF("reverse", BeanReverse);
Bean.newF("flip", BeanReverse);
