edits a value by index or key<br>
type: `Function`

works the same as:
```js
Stew[entry] = value;
Stew.key = value;
```

alt names:
- edit()

<br>

arguments:
> - entry `Any`:<br>
> index or key to set at

> - value `Any`:<br>
> value to set

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');


let arr = new Stew([ "a", "x", "y", "d" ]);


arr.set(1, "b");
arr.set("y", "c");


console.log(arr);
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "val1", key2: "valX", key3: "valY", key4: "val4" });


obj.set(1, "val2");
obj.set("key3", "val3");


console.log(obj);
```

</td>
<tr>
<td>

```js
Stew(4) [ "a", "b", "c", "d" ]
```

</td>
<td>

```js
Stew(4) { key1: "val1", key2: "val2", key3: "val3", key4: "val4" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/set.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>