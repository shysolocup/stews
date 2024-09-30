removes entries that don't pass a check function in another object<br>
type: `Function`

arguments:
> - object `Any`:<br>
> object to go through

> - checker `Function`:<br>
> goes through every entry of the given object with the function<br>
> if it returns false it removes that entry in the main soup<br>
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


let arr = new Soup([ "abc", "def", "ghi" ]);
let arr2 = new Soup([ 1, 2, 3 ]);


console.log(arr.filterBy( arr2, (v, i) => {
    // if it's equal to 2 remove it
    return v != 2
}));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ key1: "val1", key2: "val2", key3: "val3" });


console.log(obj.filterBy( obj.values, (k, v, i) => {
    // if it's equal to "val2" remove it
    return v != "val2";
}));
```

</td>
<tr>
<td>

```js
Soup(2) [ "abc", "ghi" ] 
```

</td>
<td>

```js
Soup(2) { key1: "val1", key3: "val3" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/filterBy.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>