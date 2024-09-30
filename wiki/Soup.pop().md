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
const { Soup } = require('stews');


let arr = new Soup([ "a", "b", "d", "c", "e" ]);


arr.pop(); // removes "e"
arr.pop(1); // removes "d"


console.log(arr);
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ a: 1, b: 2, d: 4, c: 3, e: 5 });


obj.pop(); // removes e
obj.pop(1); // removes d


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

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/pop.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>