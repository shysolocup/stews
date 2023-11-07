---
# Stews 🍲
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/v/stews?style=flat&color=red&logo=npm&logoColor=white" alt="version" /></a>
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/dt/stews?style=flat&logo=docusign&logoColor=white" alt="downloads" /></a>
<a href="https://github.com/paigeroid/stews/discussions"><img src="https://img.shields.io/github/discussions/paigeroid/stews?logo=google%20chat&logoColor=white" alt="discussions" /></a>
<a href="https://github.com/paigeroid/stews/issues"><img src="https://img.shields.io/github/issues/paigeroid/stews" alt="issues" /></a>
<a href="https://github.com/paigeroid/stews/wiki"><img src="https://img.shields.io/badge/docs-stews?color=purple&logo=gitbook&logoColor=white" alt="docs" /></a>

**Stews is a [Node.JS](https://nodejs.org/en/) package meant to make storing data easier by mixing parts from common data types.**
  - Fully open source
  - Full modding support
  - Built in random class
  - Index & entry systems
  - HTML and JSON compatible

<br>

---

<br>

## Installation
```console
npm i stews
```
```console
npm i paigeroid/stews
```
<br>

## Types
The three main classes included in stews are stews and soups and are both compatible with the common data types<br>
- Stews are made using [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) so they ***DON'T*** allow duplicate entries
- Soups are made using [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) so they ***DO*** allow duplicate entries
- Noodles are made specifically using [Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

<br>

> ## Stew
> ```js
> // Stew { insides: Set(3) { "a", "b", "c" }, type: "list" }
> new Stew( ["a", "a", "a", "b", "b", "c"] );
> 
> // Stew { insides: Map(2) { "key0" => "value0", "key1" => "value1" }, type: "pair" }
> new Stew( {key0: "value0", key1: "value1"} );
> ```

> ## Soup
> ```js
> // Soup { insides: [ "a", "a", "a", "b", "b", "c" ], type: "list" }
> new Soup( ["a", "a", "a", "b", "b", "c"] );
>
> // Soup { insides: { key0: "value0", key1: "value1" }, type: "pair" }
> new Soup( {key0: "value0", key1: "value1"} );
> ```

<br>

> ## Noodle
> ```js
> // Noodle { contents: "abc 123" }
> new Noodle( "abc 123" );
> ```

<br>

## Usage
```js
const { Stew, Soup } = require('stews');

let list = new Stew( ["b", "c"] );
let pair = new Stew( {k1: "v1", k2: "v2"} );


// push and pull
list.push("d"); // ["b", "c", "d"]
list.pull("a"); // ["a", "b", "c", "d"]

pair.push("k3", "v3"); // {k1: "v1", "k2": "v2", "k3", "v3"}
pair.pull("k0", "v0"); // {k0: "v0", k1: "v1", "k2": "v2", "k3", "v3"}


// get
list[0]; // "a"
list[1]; // "b"

pair[0]; // "v0"
pair[1]; // "v1"


// length
list.length; // 4
pair.length; // 4


// keys values and entries
list.keys; // ['0', '1', '2']
list.values; // ['a', 'b', 'c']
list.entries; // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

pair.keys; // ['k0', 'k1', 'k2', 'k3']
pair.values; // ['v0', 'v1', 'v2', 'v3']
pair.entries; // [ ['k0', 'v0'], ['k1', 'v1'], ['k2', 'v2'], ['k3', 'v3'] ]


// set and rename
list[1] = "set"; // ["a", "set", "c", "d"]
pair[1] = "set"; // {k0: 'v0', k1: 'set', k2: 'v2', k3: 'v3'}

list.rename(1, "rename"); // ["a", "rename", "c", "d"]
pair.rename(1, "rename"); // {k0: 'v0', rename: 'set', k2: 'v2', k3: 'v3'}


// delete pop and shift
list.pop(); // ["a", "rename", "c"]
pair.pop(); // {k0: 'v0', rename: 'set', k2: 'v2'}

list.shift(); // ["rename", "c"]
pair.shift(); // {rename: 'set', k2: 'v2'}

delete list[0]; // ["c"]
delete pair[0]; // {k2: 'v2'}


// pour
list.pour(); // ["c"]
list.pour(Object); // {'0': 'c'}
list.pour(Set); // Set(1) {"c"}
list.pour(Map); // Map(0) { '0' => 'c' }

pair.pour(); // {k2: "v2"}
pair.pour(Array); // [ ["k2", "v2"] ]
pair.pour(Set); // Set(1) { ["k2", "v2"] }
pair.pour(Map); // Map(1) { "k2" => "v2" }
```
