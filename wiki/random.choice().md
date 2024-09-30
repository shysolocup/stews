chooses a random entry in an object<br>
type: `Function`

<br>

arguments:
> - ?object `Any`<br>
> thing that it'll randomly choose from<br>
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

console.log(random.choice(arr));
```

</td>
<td>

```js
const { random } = require('stews');

let obj = { key1: "val1", key2: "val2" };

console.log(random.choice(obj));
```

</td>
<tr>
<td>

```js
"c"
```

</td>
<td>

```js
[ "key1", "val1" ]
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/random/functions/choice.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/random-methods) </h1>