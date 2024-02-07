const Bean = require('../index.js');
const Soup = require('@stews/soup');


function BeanAdd(...args) {
    args.forEach( a => this.content+=1 );
}


Bean.newF("add", BeanAdd);
