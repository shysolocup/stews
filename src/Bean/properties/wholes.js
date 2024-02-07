const Bean = require('../index.js');


function BeanWholes() {
    return this.ints[0];
}


Bean.newP("wholes", BeanWholes);
