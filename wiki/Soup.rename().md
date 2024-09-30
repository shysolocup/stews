edits a key by key or index<br>
type: `Function`

arguments:
> - entry `Any`:<br>
> index or key to rename at

> - value `String`:<br>
> value to set the key to

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr = new Soup([ "a", "x", "y" ]);


arr.rename(1, "b");
arr.rename("y", "c");


console.log(arr);
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ key1: "val1", keyX: "val2", keyY: "val3" });


obj.rename(1, "key2");
obj.rename("keyY", "key3");


console.log(obj);
```

</td>
<tr>
<td>

```js
Soup(3) [ "a", "b", "c" ]
```

</td>
<td>

```js
Soup(3) { key1: "val1", key2: "val2", key3: "val3" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/rename.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>