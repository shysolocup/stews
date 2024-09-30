list of the stew's values<br>
type: `Array`

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');

let arr = new Stew([ 1, 2, 3 ]);

console.log(arr.values);
```

</td>
<td>

```js
const { Stew } = require('stews');

let obj = new Stew({ key1: "val1", key2: "val2" });

console.log(obj.values);
```

</td>
<tr>
<td>

```js
[ 1, 2, 3 ]
```

</td>
<td>

```js
[ "val1", "val2" ]
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/properties/values.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-properties) </h1>