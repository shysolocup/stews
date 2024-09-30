removes entries that don't pass a check function in another object<br>
type: `Function`

arguments:
> - object `Any`:<br>
> object to go through

> - checker `Function`:<br>
> goes through every entry of the given object with the function<br>
> if it returns false it removes that entry in the main stew<br>
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


let arr = new Stew([ "abc", "def", "ghi" ]);
let arr2 = new Stew([ 1, 2, 3 ]);


console.log(arr.filterBy( arr2, (v, i) => {
    // if it's equal to 2 remove it
    return v != 2
}));
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "val1", key2: "val2", key3: "val3" });


console.log(obj.filterBy( obj.values, (k, v, i) => {
    // if it's equal to "val2" remove it
    return v != "val2";
}));
```

</td>
<tr>
<td>

```js
Stew(2) [ "abc", "ghi" ] 
```

</td>
<td>

```js
Stew(2) { key1: "val1", key3: "val3" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/filterBy.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>