adds a new entry to the front<br>
type: `Function`

alt names:
- push_front()

<br>

arguments:
> - key/value `Any` <br>
> key or value to pull<br>
> for lists you only use the value

> - ?value `Any`<br>
> optional value to pull<br>
> only used in pairs

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');

let arr = new Stew([ "b", "c" ]);

arr.pull("a");

console.log(arr);
```

</td>
<td>

```js
const { Stew } = require('stews');

let obj = new Stew({ key2: "val2", key3: "val3" });

obj.pull("key1", "val1");

console.log(obj);
```

</td>
<tr>
<td>

```js
Stew(3) [ "a", "b", "c" ]
```

</td>
<td>

```js
Stew(3) { key1: "val1", key2: "val2", key3: "val3" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/pull.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>