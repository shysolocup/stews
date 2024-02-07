const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanPower(...args) {
    args.forEach( a => this.content**=a );
    return this;
}


Bean.newF("pow", BeanPower);
Bean.newF("power", BeanPower);
Bean.newF("expo", BeanPower);
