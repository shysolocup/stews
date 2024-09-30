gets the last entry<br>
type: `Function`

alt names:
- back()
- end()

<br>

arguments:
> - ?offset `Number`<br>
> optional offset from the last index

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');


let arr = new Stew([ "a", "b", "c" ]);


console.log(arr.last());
console.log(arr.last(1));
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "val1", key2: "val2", key3: "val3" });


console.log(obj.last());
console.log(obj.last(1));
```

</td>
<tr>
<td>

```js
"c" // offset of 0 gets the last entry
"b" // offset of 1 gets the second to last entry
```

</td>
<td>

```js
{ key: "key3", value: "val3", index: 2 } // offset of 0 gets the last entry
{ key: "key2", value: "val2", index: 0 } // offset of 1 gets the second to last entry
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/last.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>