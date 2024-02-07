const Bean = require('../index.js');


function BeanHex() {
	return (new Function(`return 0x${this.content}`))();
}


Bean.newP("hex", BeanHex);
