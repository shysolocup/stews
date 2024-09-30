overwrites all keys with something<br>
type: `Function`

alt names:
- mapKey()

<br>

arguments:
> - mapper `Function`:<br>
> goes through every entry with the function and replaces the key with the return value<br>
> see [Stew.forEach()](https://github.com/shysolocup/stews/wiki/Stew.forEach()) for more info

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Stew } = require('stews');


let arr = new Stew([ "abc", "def" ]);


console.log(arr.mapKeys( (v, i) => {
    return `${v} ${ 123 * (i+1) }`;
}));
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ x: "val1", y: "val2" });


console.log(obj.mapKeys( (k, v, i) => {
    return `key${i}`;
}));
```

</td>
<tr>
<td>

```js
Stew(2) [ "abc 123", "def 246" ] 
```

</td>
<td>

```js
Stew(2) { key1: "val1", key2: "val2" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/mapKeys.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>