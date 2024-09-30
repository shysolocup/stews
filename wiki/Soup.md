Soups are built off of [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) so they **DO** allow duplicate entries
<br>

they work with most types like Arrays, Objects, Sets, Maps, etc<br>
type: `AeplClass`

<br>

arguments:
> - object `Any`: <br>
> thing to be converted

> - splitter `String`:<br>
> what it should split by if it's a string

<br>

| <h3>[properties](https://github.com/shysolocup/stews/wiki/Soup-properties)</h3> | <h3>[methods](https://github.com/shysolocup/stews/wiki/Soup-methods)</h3> | <h3>[source](https://github.com/shysolocup/stews/tree/main/src/Soup)<h3> |
| - | - | - |

<br>

```js
const { Soup } = require('stews');


// list
new Soup([ "a", "b", "c" ]); // Soup(3) [ "a", "b", "c" ]


// pair
new Soup({ key1: "val1", key2: "val2" }); // Soup(2) { key1: "val1", key2: "val2" }
```

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki) </h1>