removes every entry<br>
type: `Function`

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');

let arr = new Soup([ "a", "b" ]);

console.log(arr);

arr.clear();

console.log(arr);
```

</td>
<td>

```js
const { Soup } = require('stews');

let obj = new Soup({ key1: "val1", key2: "val2" });

console.log(obj);

obj.clear();

console.log(obj);
```

</td>
<tr>
<td>

```js
Soup(2) [ "a", "b" ] // before
Soup(0) [  ] // after
```

</td>
<td>

```js
Soup(2) { key1: "val1", key2: "val2" } // before
Soup(0) {  } // after
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/clear.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>