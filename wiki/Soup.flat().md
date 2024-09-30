concats layers into one object<br>
type: `Function`

arguments:
> - ?depth `Number`<br>
> optional depth telling it how many layers it should flatten

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr = new Soup([ ["a", "b"], [ "c", [ "d" ] ] ]);


console.log(arr.flat());
console.log(arr.flat(2));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ key1: "val1", key2: ["val2"] });


console.log(obj.flat());
console.log(obj.flat(2));
```

</td>
<tr>
<td>

```js
Soup(4) [ "a", "b", "c", [ "d" ] ] // depth of 1
Soup(4) [ "a", "b", "c", "d" ] // depth of 2
```

</td>
<td>

```js
Soup(4) [ "key1", "val1", "key2", [ "val2" ] ] // depth of 1
Soup(4) [ "key1", "val1", "key2", "val2" ] // depth of 2
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/flat.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>