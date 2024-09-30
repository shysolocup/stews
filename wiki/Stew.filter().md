removes entries that don't pass a check function<br>
type: `Function`

arguments:
> - checker `Function`:<br>
> goes through every entry with the function<br>
> if it returns false it removes that entry<br>
> see [Stew.forEach()](https://github.com/shysolocup/stews/wiki/Stew.forEach()) for more info

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');


let arr = new Stew([ "abc", "def", "abcdef" ]);


console.log(arr.filter( (v, i) => {
    // if it doesn't include "abc" remove it
    return v.includes("abc");
}));
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "val1", key2: "valA", key3: "B" });


console.log(obj.filter( (k, v, i) => {
    // if it doesn't include "val" remove it
    return v.includes("val");
}));
```

</td>
<tr>
<td>

```js
Stew(2) [ "abc", "abcdef" ] 
```

</td>
<td>

```js
Stew(2) { key1: "val1", key2: "valA" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/filter.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>