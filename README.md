# <ins> Stews </ins>
Stews is a JavaScript package meant to make storing info easier. Stews are combinations of arrays, objects, sets and maps.<br>
It takes a more index based style similar to that of arrays while still maintaining the style of objects, sets and maps.<br>
<br>
## Usage
here are some of the things you can do with stews:
```js
const { Stew } = require('stews');

let obj = new Stew( {"a": 1, "b": 2, "c": 3, "d": 4} );
let arr = new Stew( [1, 2, 3, 4] );
// it also works for sets and maps

obj.indexOf("a"); // 0

obj.fetch("b"); // 2
obj.fetch(1); // 2

obj.pair(); // {a: 1, b: 2, c: 3, d: 4}

obj.delete(3); // deletes d (you can also just do obj.delete("d")) 

obj.pop(); // deletes one entry at the end of the stew

obj.list(); // [ [ 'a', 1 ], [ 'b', 2 ] ]

obj.keys; // ['a', 'b']
obj.values; // [1, 2]

obj.includes("a"); // true
obj.includes("c"); // false
```
<br>

## Installation
```console
npm i stews
```
```console
npm i nuttmegg/stews
```
