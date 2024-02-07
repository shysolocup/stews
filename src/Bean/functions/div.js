const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanDiv(...args) {
    args.forEach( a => this.content/=1 );
    return this;
}


Bean.newF("div", BeanDiv);
