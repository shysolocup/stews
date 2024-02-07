const Bean = require('../index.js');


function BeanWholes() {
    return (this.ints[0] instanceof Array) ? this.ints[0] : this.ints;
}


Bean.newP("wholes", BeanWholes);
