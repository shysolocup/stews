gets an entry by index or key<br>
type: `Function`

works the same as:
```js
Stew[entry];
Stew.key
```

alt names:
- at()

<br>

arguments:
> - entry `Any`:<br>
> index or key to get

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');


let arr = new Stew([ "val1", "val2" ]);


console.log(arr.get("val1"));
console.log(arr.get(0));


// these work the same
arr["val1"];
arr[0];
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "val1" });


console.log(obj.get("key1"));
console.log(obj.get(0));


// these work the same
obj["key1"];
obj[0];
```

</td>
<tr>
<td>

```js
"val1" // get by key
"val1" // get by index
```

</td>
<td>

```js
"val1" // get by key
"val1" // get by index
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/get.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>