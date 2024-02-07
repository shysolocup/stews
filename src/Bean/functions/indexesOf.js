const Bean = require('../index.js');


function BeanIndexesOf(entry) {
	let index = this.ints.flat().indexOf(entry);
    let length = entry.length;

    let stuff = [ index ];

    for (let i = 1; i < length; i++) {
        stuff.push(index + i);
    }

    return stuff;
}


Bean.newF("indexesOf", BeanIndexesOf);
