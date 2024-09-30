creates a separate copy of the soup<br>
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
const { Soup } = require('stews');

let arr = new Soup([ "a", "c" ]);
let copy = arry.copy();

arr[1] = "b";

console.log(arr);
console.log(copy);
```

</td>
<td>

```js
const { Soup } = require('stews');

let obj = new Soup({ key1: "val1", key2: "val3" });
let copy = obj.copy();

obj[1] = "val2";

console.log(obj);
console.log(copy);
```

</td>
<tr>
<td>

```js
Soup(2) [ "a", "b" ] // original
Soup(2) [ "a", "c" ] // copy
```

</td>
<td>

```js
Soup(2) { key1: "val1", key2: "val2" } // original
Soup(2) { key1: "val1", key2: "val3" } // copy
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/copy.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>