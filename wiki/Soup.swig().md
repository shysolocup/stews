checks if only one entry passes a given check<br>
alternative to [Soup.chug()](https://github.com/shysolocup/stews/wiki/Soup.chug())<br>
type: `Function`

alt names:
- some()

<br>

arguments:
> - checker `Function`:<br>
> goes through every entry with the function<br>
> if it returns true then the swig returns true<br>
> see [Soup.forEach()](https://github.com/shysolocup/stews/wiki/Soup.forEach()) for more info

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');


let arr = new Soup([ "abc", 123 ]);


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
const { Soup } = require('stews');


let obj = new Soup({ key1: "abc", key2: 123 });


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

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/swig.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>