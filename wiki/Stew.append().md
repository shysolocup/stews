inserts a new entry at a given index<br>
type: `Function`

alt names:
- insert()
- push_at()
- push_to()

<br>

arguments:
> - index `Number`<br>
> index to append at<br>
> puts the appended entry infront of the index

> - key/value `Any` <br>
> key or value to append<br>
> for lists you only use the value

> - ?value `Any`<br>
> optional value to append<br>
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

let arr = new Stew([ "a", "c" ]);

arr.append(1, "b");

console.log(arr);
```

</td>
<td>

```js
const { Stew } = require('stews');

let obj = new Stew({ key1: "val1", key3: "val3" });

obj.append(1, "key2", "val2");

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

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/append.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>