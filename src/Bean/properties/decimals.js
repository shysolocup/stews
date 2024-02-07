const Bean = require('../index.js');


function BeanDecimals() {
    return this.ints.pop();
}


Bean.newP("decimals", BeanDecimals);
Bean.newP("dec", BeanDecimals);
