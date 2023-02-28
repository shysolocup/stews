---
# Stews
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/v/stews?style=flat&color=red&logo=npm&logoColor=white" alt="version" />
<a href="https://www.npmjs.com/package/stews"><img src="https://img.shields.io/npm/dt/stews?style=flat&color=green&logo=npm&logoColor=white" alt="downloads" />
<a href="https://github.com/nuttmegg/stews/discussions"><img src="https://img.shields.io/github/discussions/nuttmegg/stews?logo=wechat&logoColor=white" alt="discussions" />
<a href="https://github.com/nuttmegg/stews/issues"><img src="https://img.shields.io/github/issues/nuttmegg/stews" alt="issues" />
  
Stews is a JavaScript package meant to make storing info easier. It makes two new classes with combinations of elements from arrays, objects, sets and maps.<br><br>
It takes a more index based style similar to that of arrays while still maintaining the style of objects, sets and maps.<br><br><br>

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
> 
> stew.length; // 2
> stew.indexOf("b"); // 0
> 
> stew.get("b"); // 1
> stew.get(0); // 1
> 
> stew.pull("a", 0); // Map(3) { 'a' =>  0, 'b' => 1, 'c' => 2}
> stew.push("d", 3); // Map(4) { 'a' =>  0, 'b' => 1, 'c' => 2, 'd' => 3}
>
> stew.stir(); // {a: 0, b: 1, c: 2, d: 3}
> ```

> ### Soups
> Class that uses arrays and objects (soups DO allow duplicates
> ```js
> const { Soup } = require('stews');
> 
> let soup = new Soup( {"b": 1, "c": 2} );
> 
> soup.length; // 2
> soup.indexOf("b"); // 0
>
> soup.get("b"); // 1
> soup.get(0); // 1
> 
> soup.pull("a", 0); // {a: 0, b: 1, c: 2}
> soup.push("d", 3); // {a: 0, b: 1, c: 2, d: 3}
>
> soup.stir(); // {a: 0, b: 1, c: 2, d: 3}
> ```
