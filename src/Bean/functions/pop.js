const Bean = require('../index.js');


function BeanPop(offset=0) {
	let index = (this.length-1)-offset;
    let returns = { value: this.get(index), index: index };
    this.delete(index);
    return returns;
}


Bean.newF("pop", BeanPop);
Bean.newF("unpush", BeanPop);
