const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanSubt(...args) {
    args.forEach( a => this.content-=a );
    return this;
}


Bean.newF("subt", BeanSubt);
