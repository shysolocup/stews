const prox = require('../index.js');
const Soup = require('@stews/soup');


prox.deleteProperty = (target, prop) => {
  if (Number(prop)+1 && Number(prop) <= target.length-1) { // if it is a number
	  	target.delete(Number(prop));
		return true;
	}
	else {
		return false;
	}
};
