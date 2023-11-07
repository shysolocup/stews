const fs = require('fs');


module.exports = {};


// compiling properties
let prox_dir = require('./data/_funkydir');
let prox = fs.readdirSync(prox_dir).filter( file => ((file.endsWith('.js') || file.endsWith('.ts')) ));  
prox.forEach( (file) => {
	require(`./data${file}`);
});
