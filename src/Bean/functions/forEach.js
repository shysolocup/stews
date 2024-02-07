const Bean = require('../index.js');


function BeanForEach(func) {
    this.ints.flat().forEach(func);
}


Bean.newF("forEach", BeanForEach);
