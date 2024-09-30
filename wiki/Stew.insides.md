content inside of the stew<br>
type: `Set` or `Map`

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

console.log(arr.insides);
```

</td>
<td>

```js
const { Stew } = require('stews');

let obj = new Stew({ key1: "val1", key2: "val2" });

console.log(obj.insides);
```

</td>
<tr>
<td>

```js
Set(3) { 1, 2, 3 }
```

</td>
<td>

```js
Map(2) { key1 => "val1", key2 => "val2" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/construct/__form.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-properties) </h1>