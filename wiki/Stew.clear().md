removes every entry<br>
type: `Function`

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');

let arr = new Stew([ "a", "b" ]);

console.log(arr);

arr.clear();

console.log(arr);
```

</td>
<td>

```js
const { Stew } = require('stews');

let obj = new Stew({ key1: "val1", key2: "val2" });

console.log(obj);

obj.clear();

console.log(obj);
```

</td>
<tr>
<td>

```js
Stew(2) [ "a", "b" ] // before
Stew(0) [  ] // after
```

</td>
<td>

```js
Stew(2) { key1: "val1", key2: "val2" } // before
Stew(0) {  } // after
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/clear.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>