checks if it ends with stuff<br>
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


// false because it doesn't end with that
console.log(arr.endsWith("de"));


// true because it does end with it
console.log(arr.endsWith("def"));


// true because it does end with one of them
console.log(arr.endsWith("de", "def"));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ abc: 0, def: 1 });


// false because it doesn't end with that
console.log(obj.endsWith("de"));


// true because it does end with it
console.log(obj.endsWith("def"));


// true because it does end with that
console.log(obj.endsWith("de", "def"));
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

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/endsWith.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>