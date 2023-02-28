# <ins> Stews </ins>
Stews is a JavaScript package meant to make storing info easier. It makes two new classes with combinations of elements from arrays, objects, sets and maps.<br><br>
It takes a more index based style similar to that of arrays while still maintaining the style of objects, sets and maps.<br>
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
The two classes in stews are stews and soups<br><br>
stews can't have duplicates ( `[1, 1, 1, 1]` incorrectly outputs as just `[1]` )<br>
soups can have duplicates ( `[1, 1, 1, 1]` correctly outputs as `[1, 1, 1, 1]` )
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
> soup.pull("a", 0); // {a: 0, b: 1, c: 2}
> soup.push("d", 3); // {a: 0, b: 1, c: 2, d: 3}
>
> soup.stir(); // {a: 0, b: 1, c: 2, d: 3}
> ```
