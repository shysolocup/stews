chooses a random index in an object<br>
type: `Function`

<br>

arguments:
> - ?object `Any`<br>
> thing that it'll randomly choose an index from<br>
> if not given it'll default to the binder

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { random } = require('stews');

let arr = ["a", "b", "c"];

console.log(random.index(arr));
```

</td>
<td>

```js
const { random } = require('stews');

let obj = { key1: "val1", key2: "val2" };

console.log(random.index(obj));
```

</td>
<tr>
<td>

```js
2
```

</td>
<td>

```js
0
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/random/functions/index.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/random-methods) </h1>