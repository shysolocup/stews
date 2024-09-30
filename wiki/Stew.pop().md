removes the last entry<br>
type: `Function`

alt names:
- unpush()

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


let arr = new Stew([ "a", "b", "d", "c", "e" ]);


arr.pop(); // removes "e"
arr.pop(1); // removes "d"


console.log(arr);
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ a: 1, b: 2, d: 4, c: 3, e: 5 });


obj.pop(); // removes e
obj.pop(1); // removes d


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

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/pop.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>