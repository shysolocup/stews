turns strings (keys and values) into uppercase<br>
type: `Function`

alt names:
- upper()

<br>

arguments:
> - ?entries `Any`<br>
> list of keys or indexes (array or arguments) to turn to uppercase<br><br>
> if given it'll only turn those indexes to uppercase<br>
> if not given it'll turn all entries to uppercase

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


// turns all entries to uppercase
console.log(arr.toUpperCase());


// turns only indexes 0 and 2
console.log(arr.toUpperCase(0, 2));
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "val1", key2: "val2", key3: "val3" });


// turns all entries to uppercase
console.log(obj.toUpperCase());


// turns only indexes 0 and 2
console.log(obj.toUpperCase(0, 2));
```

</td>
<tr>
<td>

```js
Stew(3) [ "A", "B", "C" ] // turns all entries to uppercase
Stew(3) [ "A", "b", "C" ] // turns only indexes 0 and 2
```

</td>
<td>

```js
Stew(3) { KEY1: "VAL1", KEY2: "VAL2", KEY3: "VAL3" } // turns all entries to uppercase
Stew(3) { KEY1: "VAL1", key2: "val2", KEY3: "VAL3" } // turns only indexes 0 and 2
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/toUpperCase.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>