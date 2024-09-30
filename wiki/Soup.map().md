overwrites all values with something<br>
type: `Function`

arguments:
> - mapper `Function`:<br>
> goes through every entry with the function and replaces the value with the return value<br>
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


console.log(arr.map( (v, i) => {
    return `${v} ${ 123 * (i+1) }`;
}));
```

</td>
<td>

```js
const { Soup } = require('stews');


let obj = new Soup({ key1: "abc", key2: "def" });


console.log(obj.map( (k, v, i) => {
    return `${v} ${ 123 * (i+1) }`;
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
Soup(2) { key1: "abc 123", key2: "def 246" }
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/map.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>