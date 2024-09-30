checks if only one entry passes a given check<br>
alternative to [Stew.chug()](https://github.com/shysolocup/stews/wiki/Stew.chug())<br>
type: `Function`

alt names:
- some()

<br>

arguments:
> - checker `Function`:<br>
> goes through every entry with the function<br>
> if it returns true then the swig returns true<br>
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


let arr = new Stew([ "abc", 123 ]);


console.log(arr.swig( (v, i) => {
    // returns true because one entry is a number
    return typeof v == "number";
}));


console.log(arr.swig( (v, i) => {
    // returns true because every entry is not an object
    return typeof v != "object";
}));
```

</td>
<td>

```js
const { Stew } = require('stews');


let obj = new Stew({ key1: "abc", key2: 123 });


console.log(obj.swig( (k, v, i) => {
    // returns true because one value is a number
    return typeof v == "number";
}));


console.log(obj.swig( (k, v, i) => {
    // returns true because every value is not an object
    return typeof v != "object";
}));
```

</td>
<tr>
<td>

```js
true
true
```

</td>
<td>

```js
true
true
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Stew/functions/swig.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Stew-methods) </h1>