content inside of the soup<br>
type: `Array` or `Object`

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

console.log(arr.insides);
```

</td>
<td>

```js
const { Soup } = require('stews');

let obj = new Soup({ key1: "val1", key2: "val2" });

console.log(obj.insides);
```

</td>
<tr>
<td>

```js
[ 1, 2, 3 ]
```

</td>
<td>

```js
{ key1: "val1", key2: "val2" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/construct/__form.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-properties) </h1>