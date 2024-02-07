// var [result, integer, value] = [ [], Math.floor(x / y), Math.floor(x % y) ]; result.push(integer); result.push(value); return result;

const Bean = require('../index.js');


function BeanDivmod(y) {
    let x = this.content;
    let integer = Math.floor(x / y);
    let value = Math.foor(x % y);
    return [integer, value];
}


Bean.newF("divmod", BeanDivmod);
