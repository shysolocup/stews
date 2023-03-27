---
# Stews 🍲
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/v/stews?style=flat&color=red&logo=npm&logoColor=white" alt="version" />
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/dt/stews?style=flat&logo=docusign&logoColor=white" alt="downloads" />
<a href="https://github.com/nuttmegg/stews/discussions"><img src="https://img.shields.io/github/discussions/nuttmegg/stews?logo=google%20chat&logoColor=white" alt="discussions" />
<a href="https://github.com/nuttmegg/stews/issues"><img src="https://img.shields.io/github/issues/nuttmegg/stews" alt="issues" />
<a href="https://github.com/nuttmegg/stews/wiki"><img src="https://img.shields.io/badge/docs-stews?color=purple&logo=gitbook&logoColor=white" alt="docs" />
  
Stews is a [Node.JS](https://nodejs.org/en/) package meant to make storing data easier. It has two new classes with combinations of methods from arrays, objects, sets and maps.<br><br>

It uses an index system similar to that of arrays as well as an entry system similar to that of objects.<br><br>

It's fully open source with complete documentation and support for prototypes to make your own custom methods.<br><br>

---

<br>

## Installation
```console
npm i stews
```
```console
npm i nuttmegg/stews
```
<br>

## Usage
The two main classes included are stews and soups. Random is a separate thing if you want to look into it the link is [here](https://github.com/nuttmegg/stews/wiki/Random)<br><br>
> ### Stew
> Stew is a class that's built off of sets and maps though they are compatable with arrays, strings, and other objects<br>
> In a list stews CANNOT have duplicate entries
> ```js
> const { Stew } = require('stews');
> 
> /* LISTS */
> var list = new Stew( ["a", "a", "b", "c"] ); // Stew { insides: Set(3) { "a", "b", "c" }, type: "list" }
>
> list.length; // 3
> list.indexOf("b"); // 1
>
> // all output "a"
> list.get(0);
> list.get("a");
>
> list[0];
> list["a"];
> list.a;
> 
> list.shift(); // Set(2) { "b", "c" }
> list.pop(); // Set(1) { "b" }
> delete list[0]; // Set(0) { }
>
> list.set(0, "b"); // Set(1) { "b" }
> list[0] = "b"; // Set(1) { "b" }
>
> list.pull("a"); // Set(2) { "a", "b" }
> list.push("c"); // Set(3) { "a", "b", "c" }
>
> list.pour(); // ["a", "b", "c"]
>
>
> /* PAIRS */
> var pair = new Stew( {"key0": "value0", "key1": "value1"} ); // Stew { insides: Map(2) { "key0" => "value0", "key1" => "value1" }, type: "pair" }
>
> pair.length; // 2
> pair.indexOf("key1"); // 1
>
> // all output "value0"
> pair.get(0);
> pair.get("key0");
>
> pair[0];
> pair["key0"];
> pair.key0;
> 
> pair.shift(); // Map(1) { "key1" => "value1" }
> pair.pop(); // Map(0) { }
>
> pair.pull("key0", "value0"); // Map(1) { "key0" => "value0" }
> pair.push("key1", "value1"); // Map(2) { "key0" => "value0", "key1" => "value1" }
>
> pair.pour(); // {"key0": "value0", "key1": "value1"}
> ```
<br>
  
> ### Soup
> Soup is a class that's built off of arrays and objects though they are compatable with strings, maps, and sets<br>
> In a list soups CAN have duplicate entries
> ```js
> const { Soup } = require('stews');
> 
> /* LISTS */
> var list = new Soup( ["a", "a", "b", "c"] ); // Soup { insides: ["a", "a", "b", "c"], type: "list" }
>
> list.length; // 4
> list.indexOf("b"); // 2
>
> // all output "a"
> list.get(0);
> list.get("a");
>
> list[0];
> list["a"];
> list.a;
> 
> list.shift(); // ["a", "b", "c"]
> list.pop(); // ["a", "b"]
> delete list[0]; // ["b"]
>
> list.set(0, "b"); // ["b"]
> list[0] = "b"; // ["b"]
>
> list.pull("a"); // ["a", "b"]
> list.push("c"); // ["a", "b", "c"]
>
> list.pour(); // ["a", "b", "c"]
>
>
> /* PAIRS */
> var pair = new Soup( {"key0": "value0", "key1": "value1"} ); // Soup { insides: {"key0": "value0", "key1": "value1"}, type: "pair" }
>
> pair.length; // 2
> pair.indexOf("key1"); // 1
>
> // all output "value0"
> pair.get(0);
> pair.get("key0");
>
> pair[0];
> pair["key0"];
> pair.key0;
> 
> pair.shift(); // {"key1": "value1"}
> pair.pop(); // {}
>
> pair.pull("key0", "value0"); // {"key0": "value0"}
> pair.push("key1", "value1"); // {"key0": "value0", "key1": "value1"}
>
> pair.pour(); // {"key0": "value0", "key1": "value1"}
> ```
