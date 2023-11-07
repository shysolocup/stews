const fs = require('fs');


module.exports = (d) => {
    let dir = require(`./${d}/_funkydir`);
    let files = fs.readdirSync(dir).filter( file => ((file.endsWith('.js') || file.endsWith('.ts')) ));  
    files.forEach( (file) => {
        require(`./${d}/${file}`);
    });
};
