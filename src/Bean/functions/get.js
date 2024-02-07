const Bean = require('../index.js');


function BeanGet(index) {
    let ret = undefined;

	if (this.ints[0] instanceof Array) {
        ret = Number(this.ints.flat()[index]);
	}
	else {
		ret = Number(this.content.toString().split("")[index]);
	}

    return ret;
}


Bean.newF("get", BeanGet);
Bean.newF("at", BeanGet);
