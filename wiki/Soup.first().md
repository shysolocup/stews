gets the first entry<br>
type: `Function`

alt names:
- front()
- start()

<br>

arguments:
> - ?offset `Number`<br>
> optional offset from the first index

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr = new Soup([ "a", "b", "c" ]);


console.log(arr.first());
console.log(arr.first(1));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ key1: "val1", key2: "val2", key3: "val3" });


console.log(obj.first());
console.log(obj.first(1));
```

</td>
<tr>
<td>

```js
"a" // offset of 0 gets the first entry
"b" // offset of 1 gets the second entry
```

</td>
<td>

```js
{ key: "key1", value: "val1", index: 0 } // offset of 0 gets the first entry
{ key: "key2", value: "val2", index: 0 } // offset of 1 gets the second entry
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/first.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>