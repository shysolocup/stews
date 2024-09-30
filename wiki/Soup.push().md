adds a new entry to the end<br>
type: `Function`

alt names:
- push_back()

<br>

arguments:
> - key/value `Any` <br>
> key or value to push<br>
> for lists you only use the value

> - ?value `Any`<br>
> optional value to push<br>
> only used in pairs

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

arr.push("c");

console.log(arr);
```

</td>
<td>

```js
const { Soup } = require('stews');

let obj = new Soup({ key1: "val1", key2: "val2" });

obj.push("key3", "val3");

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

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/push.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>