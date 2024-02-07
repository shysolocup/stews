// return new Promise(resolve => setTimeout(resolve, this.parse(time)*1000));

const Bean = require('../index.js');


function BeanSleep() {
  return new Promise(resolve => setTimeout(resolve, this.content*1000));
}


Bean.newF("sleep", BeanSleep);
Bean.newF("wait", BeanSleep);
