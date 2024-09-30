edits a value by index or key<br>
type: `Function`

works the same as:
```js
Soup[entry] = value;
Soup.key = value;
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
const { Soup } = require('stews');


let arr = new Soup([ "a", "x", "y", "d" ]);


arr.set(1, "b");
arr.set("y", "c");


console.log(arr);
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ key1: "val1", key2: "valX", key3: "valY", key4: "val4" });


obj.set(1, "val2");
obj.set("key3", "val3");


console.log(obj);
```

</td>
<tr>
<td>

```js
Soup(4) [ "a", "b", "c", "d" ]
```

</td>
<td>

```js
Soup(4) { key1: "val1", key2: "val2", key3: "val3", key4: "val4" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/set.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>