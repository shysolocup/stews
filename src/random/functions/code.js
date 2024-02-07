const random = require('../index.js');


function RandomCode(length=5, characters=null) {
    if (!characters) characters = "abcdefghijklmnopqrstuvwxyz1234567890-_".split("");
    if (typeof characters == "string" || character instanceof Noodle) characters = characters.split("");
    let code = "";
    
    for (let i = 0; i < length; i++) {
        code += this.choice(characters);
    }

    return code;
}


random.newF("code", RandomCode);
