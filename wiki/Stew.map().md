overwrites all values with something<br>
type: `Function`

arguments:
> - mapper `Function`:<br>
> goes through every entry with the function and replaces the value with the return value<br>
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


console.log(arr.map( (v, i) => {
    return `${v} ${ 123 * (i+1) }`;
}));
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "abc", key2: "def" });


console.log(obj.map( (k, v, i) => {
    return `${v} ${ 123 * (i+1) }`;
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
Stew(2) { key1: "abc 123", key2: "def 246" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/map.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>