turns strings (keys and values) into lowercase<br>
type: `Function`

alt names:
- lower()

<br>

arguments:
> - ?entries `Any`<br>
> list of keys or indexes (array or arguments) to turn to lowercase<br><br>
> if given it'll only turn those indexes to lowercase<br>
> if not given it'll turn all entries to lowercase

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr = new Soup([ "A", "B", "C" ]);


// turns all entries to lowercase
console.log(arr.toLowerCase());


// turns only indexes 0 and 2
console.log(arr.toLowerCase(0, 2));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ KEY1: "VAL1", KEY2: "VAL2", KEY3: "VAL3" });


// turns all entries to lowercase
console.log(obj.toLowerCase());


// turns only indexes 0 and 2
console.log(obj.toLowerCase(0, 2));
```

</td>
<tr>
<td>

```js
Soup(3) [ "a", "b", "c" ] // turns all entries to lowercase
Soup(3) [ "a", "B", "c" ] // turns only indexes 0 and 2
```

</td>
<td>

```js
Soup(3) { key1: "val1", key2: "val2", key3: "val3" } // turns all entries to lowercase
Soup(3) { key1: "val1", KEY2: "VAL2", key3: "val3" } // turns only indexes 0 and 2
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/toLowerCase.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>