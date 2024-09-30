deletes an entry by key or index<br>
type: `Function`

works the same as:
```js
delete Soup[entry];
delete Soup.key;
```

alt names:
- del()
- remove()
- rem()

<br>

arguments:
> - entry `Any`:<br>
> index or key to delete

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr = new Soup([ "a", "d", "b", "c" ]);


arr.delete(1); // deletes "d"


console.log(arr);
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ key1: "val1", key3: "val3", key2: "val2" });


obj.delete(1); // deletes key3


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
Soup(2) { key1: "val1", key2: "val2" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/delete.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>