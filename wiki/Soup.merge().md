merges the soup with other objects<br>
type: `Function`

alt names:
- concat()

<br>

arguments:
> - ?mergers `Any`<br>
> list of objects (array or arguments) to merge with

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr1 = new Soup([ "a", "b" ]);
let arr2 = new Soup([ "c", "d" ]);
let arr3 = new Soup([ "e", "f" ]);


console.log(arr1.merge(arr2, arr3));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj1 = new Soup({ a: 0, b: 1 });
let obj2 = new Soup({ c: 2, d: 3 });
let obj3 = new Soup({ e: 4, f: 5 });


console.log(obj1.merge(obj2, obj3));
```

</td>
<tr>
<td>

```js
Soup(6) [ "a", "b", "c", "d", "e", "f" ]
```

</td>
<td>

```js
Soup(6) { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/merge.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>