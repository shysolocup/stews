overwrites all keys with something<br>
type: `Function`

alt names:
- mapKey()

<br>

arguments:
> - mapper `Function`:<br>
> goes through every entry with the function and replaces the key with the return value<br>
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


let arr = new Soup([ "abc", "def" ]);


console.log(arr.mapKeys( (v, i) => {
    return `${v} ${ 123 * (i+1) }`;
}));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ x: "val1", y: "val2" });


console.log(obj.mapKeys( (k, v, i) => {
    return `key${i}`;
}));
```

</td>
<tr>
<td>

```js
Soup(2) [ "abc 123", "def 246" ] 
```

</td>
<td>

```js
Soup(2) { key1: "val1", key2: "val2" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/mapKeys.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>