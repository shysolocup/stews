Stews are built off of [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) so they **DON'T** allow duplicate entries
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

| <h3>[properties](https://github.com/shysolocup/stews/wiki/Stew-properties)</h3> | <h3>[methods](https://github.com/shysolocup/stews/wiki/Stew-methods)</h3> | <h3>[source](https://github.com/shysolocup/stews/tree/main/src/Stew)<h3> |
| - | - | - |

<br>

```js
const { Stew } = require('stews');


// list
new Stew([ "a", "b", "c" ]); // Stew(3) [ "a", "b", "c" ]


// pair
new Stew({ key1: "val1", key2: "val2" }); // Stew(2) { key1: "val1", key2: "val2" }
```

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki) </h1>