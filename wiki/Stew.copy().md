creates a separate copy of the stew<br>
type: `Function`

alt names:
- clone()

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');

let arr = new Stew([ "a", "c" ]);
let copy = arry.copy();

arr[1] = "b";

console.log(arr);
console.log(copy);
```

</td>
<td>

```js
const { Stew } = require('stews');

let obj = new Stew({ key1: "val1", key2: "val3" });
let copy = obj.copy();

obj[1] = "val2";

console.log(obj);
console.log(copy);
```

</td>
<tr>
<td>

```js
Stew(2) [ "a", "b" ] // original
Stew(2) [ "a", "c" ] // copy
```

</td>
<td>

```js
Stew(2) { key1: "val1", key2: "val2" } // original
Stew(2) { key1: "val1", key2: "val3" } // copy
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/copy.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>