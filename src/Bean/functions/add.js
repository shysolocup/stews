const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanAdd(...args) {
    args.forEach( a => this.content+=a );
    return this;
}


Bean.newF("add", BeanAdd);
