list of the stew's keys<br>
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

console.log(arr.keys);
```

</td>
<td>

```js
const { Stew } = require('stews');

let obj = new Stew({ key1: "val1", key2: "val2" });

console.log(obj.keys);
```

</td>
<tr>
<td>

```js
[ "0", "1", "2" ]
```

</td>
<td>

```js
[ "key1", "key2" ]
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/properties/keys.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-properties) </h1>