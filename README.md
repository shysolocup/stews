# <ins> Rego </ins>
Rego is a JavaScript package meant to make storing info easier. Regos are combinations of arrays, objects, sets and maps.<br>
It takes a more index based style similar to that of arrays while still maintaining the style of objects, sets and maps.<br>
<br>
## Usage
here are some of the things you can do with regos:
```js
const { Rego } = require('rego');

let obj = new Rego( {"a": 1, "b": 2, "c": 3, "d": 4} );
let arr = new Rego( [1, 2, 3, 4] );
// it also works for sets and maps

obj.indexOf("a"); // 0

obj.fetch("b"); // { key: 'b', value: 2, index: 1 }
obj.fetch(1); // { key: 'b', value: 2, index: 1 }

obj.pair(); // {a: 1, b: 2, c: 3, d: 4}

obj.delete(3); // deletes d (you can also just do obj.delete("d")) 

obj.pop(); // deletes one entry at the end of the rego

obj.list(); // [ [ 'a', 1 ], [ 'b', 2 ] ]

obj.keys; // ['a', 'b']
obj.values; // [1, 2]

obj.includes("a"); // true
obj.includes("c"); // false
```
<br>

## Installation
```console
npm i rego
```
```console
npm i nuttmegg/rego
```
