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
const { Stew } = require('stews');


let arr = new Stew([ "e", "a", "d", "b", "c" ]);


arr.shift(); // removes "e"
arr.shift(1); // removes "d"


console.log(arr);
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ e: 5, a: 1, d: 4, b: 2, c: 3 });


obj.shift(); // removes e
obj.shift(1); // removes d


console.log(obj);
```

</td>
<tr>
<td>

```js
Stew(3) [ "a", "b", "c" ]
```

</td>
<td>

```js
Stew(3) { a: 1, b: 2, c: 3 }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/shift.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>