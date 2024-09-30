type of the soup<br>
type: `String`

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');

let arr = new Soup(Array);

console.log(arr.type);
```

</td>
<td>

```js
const { Soup } = require('stews');

let obj = new Soup(Object);

console.log(obj.type);
```

</td>
<tr>
<td>

```js
"list"
```

</td>
<td>

```js
"pair"
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/construct/__form.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-properties) </h1>