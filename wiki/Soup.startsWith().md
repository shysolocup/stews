checks if it starts with stuff<br>
type: `Function`

arguments:
> - ?values `Any`<br>
> list of values (array or arguments) to check for<br>
> if one of them is true it'll return true

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr = new Soup([ "abc", "def" ]);


// false because it doesn't start with that
console.log(arr.startsWith("bc"));


// true because it does start with it
console.log(arr.startsWith("abc"));


// true because it does start with one of them
console.log(arr.startsWith("bc", "abc"));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ abc: 0, def: 1 });


/// false because it doesn't start with that
console.log(obj.startsWith("bc"));


// true because it does start with it
console.log(obj.startsWith("abc"));


// true because it does start with one of them
console.log(obj.startsWith("bc", "abc"));
```

</td>
<tr>
<td>

```js
false
true
true
```

</td>
<td>

```js
false
true
true
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/startsWith.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>