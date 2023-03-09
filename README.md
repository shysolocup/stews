---
# Stews 🍲
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/v/stews?style=flat&color=red&logo=npm&logoColor=white" alt="version" />
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/dt/stews?style=flat&logo=docusign&logoColor=white" alt="downloads" />
<a href="https://github.com/nuttmegg/stews/discussions"><img src="https://img.shields.io/github/discussions/nuttmegg/stews?logo=google%20chat&logoColor=white" alt="discussions" />
<a href="https://github.com/nuttmegg/stews/issues"><img src="https://img.shields.io/github/issues/nuttmegg/stews" alt="issues" />
<a href="https://github.com/nuttmegg/stews/wiki"><img src="https://img.shields.io/badge/docs-stews?color=purple&logo=gitbook&logoColor=white" alt="docs" />
  
Stews is a [Node.JS](https://nodejs.org/en/) package meant to make storing info easier. It makes two new classes with combinations of elements from arrays, objects, sets and maps.<br><br>
It takes a more index based style similar to that of arrays while still maintaining the style of objects, sets and maps.<br><br>

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
The two classes included are stews and soups<br><br>
stews can't have duplicates ( `[1, 1, 1, 1]` incorrectly outputs as just `[1]` )<br>
soups can have duplicates ( `[1, 1, 1, 1]` correctly outputs as `[1, 1, 1, 1]` )<br><br>
> ### Stews
> Class that uses sets and maps (stews DON'T allow duplicates)
> ```js
> const { Stew } = require('stews');
> 
> let stew = new Stew( {"b": 1, "c": 2} );
> let stew2 = new Stew( ["a", "b", "c", "d"] );
> 
> stew.length; // 2
> stew.indexOf("b"); // 0
> 
> stew["b"]; // 1
> stew[0]; // 1
> stew.b; // 1
> 
> stew.pull("a", 0); // Map(3) { 'a' =>  0, 'b' => 1, 'c' => 2}
> stew.push("d", 3); // Map(4) { 'a' =>  0, 'b' => 1, 'c' => 2, 'd' => 3}
>
> stew.pour(); // {a: 0, b: 1, c: 2, d: 3}
> ```

> ### Soups
> Class that uses arrays and objects (soups DO allow duplicates
> ```js
> const { Soup } = require('stews');
> 
> let soup = new Soup( {"b": 1, "c": 2} );
> let soup2 = new Soup( ["a", "b", "c", "d"] );
> 
> soup.length; // 2
> soup.indexOf("b"); // 0
>
> soup["b"]; // 1
> soup[0]; // 1
> soup.b; // 1
> 
> soup.pull("a", 0); // {a: 0, b: 1, c: 2}
> soup.push("d", 3); // {a: 0, b: 1, c: 2, d: 3}
>
> soup.pour(); // {a: 0, b: 1, c: 2, d: 3}
> ```
