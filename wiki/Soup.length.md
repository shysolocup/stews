length of the soup<br>
type: `Number`<br>

alt names:
- size

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');

let arr = new Soup([ 1, 2, 3 ]);

console.log(arr.length);
```

</td>
<td>

```js
const { Soup } = require('stews');

let obj = new Soup({ key1: "val1", key2: "val2" });

console.log(obj.length);
```

</td>
<tr>
<td>

```js
3
```

</td>
<td>

```js
2
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/properties/length.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-properties) </h1>