const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanMult(...args) {
    args.forEach( a => this.content*=a );
    return this;
}


Bean.newF("mult", BeanMult);
