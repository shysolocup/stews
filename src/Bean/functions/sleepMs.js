// return new Promise(resolve => setTimeout(resolve, this.parse(time)*1000));

const Bean = require('../index.js');


function BeanSleepMs() {
  return new Promise(resolve => setTimeout(resolve, this.content));
}


Bean.newF("sleepMs", BeanSleepMs);
Bean.newF("waitMs", BeanSleepMs);
