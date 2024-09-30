removes the first entry<br>
type: `Function`

alt names:
- unpull()

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


let arr = new Soup([ "e", "a", "d", "b", "c" ]);


arr.shift(); // removes "e"
arr.shift(1); // removes "d"


console.log(arr);
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ e: 5, a: 1, d: 4, b: 2, c: 3 });


obj.shift(); // removes e
obj.shift(1); // removes d


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
Soup(3) { a: 1, b: 2, c: 3 }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/shift.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>