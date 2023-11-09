---
# Stews 🍲
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/v/stews?style=flat&color=red&logo=npm&logoColor=white" alt="version" /></a>
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/dt/stews?style=flat&logo=docusign&logoColor=white" alt="downloads" /></a>
<a href="https://github.com/paigeroid/stews/discussions"><img src="https://img.shields.io/github/discussions/paigeroid/stews?logo=google%20chat&logoColor=white" alt="discussions" /></a>
<a href="https://github.com/paigeroid/stews/issues"><img src="https://img.shields.io/github/issues/paigeroid/stews" alt="issues" /></a>
<a href="https://github.com/paigeroid/stews/wiki"><img src="https://img.shields.io/badge/docs-stews?color=purple&logo=github&logoColor=white" alt="docs" /></a>

**Stews is a [Node.JS](https://nodejs.org/en/) package meant to make storing data easier by mixing parts from common data types.**
  - Fully open source
  - Fully customizable w/ modding support
  - Built in random number and choice functions
  - Easy to use index & entry systems
  - Built in HTML and JSON compatability
  - Detailed documentation

<br>

```console
npm i stews
```
```console
npm i paigeroid/stews
```

<br>

---

<br>

## Parts
- **[Stew:](https://npmjs.com/package/@stews/stew)** built off of [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) so they **DON'T** allow duplicate entries
- **[soup:](https://npmjs.com/package/@stews/soup)** built off of [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) so they **DO** allow duplicate entries
- **[Noodle:](https://npmjs.com/package/@stews/noodle)** built off of [Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and includes a majority of their features
- **[random:](https://npmjs.com/package/@stews/random)** a built in random class that works with most types

<br>

## Usage
```js
const { Stew, Soup, Noodle, random } = require('stews');


let array = new Stew(["a", "b", "c"]);       // list type
let obj = new Soup({ key1: "val1", key2: "val2" });  // pair type
let str = new Noodle("abc 123");             // string stuff


delete array[1];


console.log(array); // Stew(2) [ 'a', 'c' ]
console.log(obj); // Soup(2) { key1: 'val1', key2: 'val2' }
console.log(str); // Noodle(7) "abc 123"


console.log(obj.length); // 2
console.log(obj.keys); // [ 'key1', 'key2' ]
console.log(obj.values); // [ 'val1', 'val2' ]


console.log(str.wordCount); // 2
console.log(str.toUpperCase(0)); // Noodle(7) "Abc 123"


console.log(random.int(1, 5)); // 4


console.log(array.random.choice()); // 'b'
console.log(obj.random.choice()); // [ 'key1', 'val1' ]
console.log(str.random.choice()); // '1'
```
