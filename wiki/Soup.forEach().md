goes through every entry<br>
type: `Function`

arguments:
> - func `Function`:<br>
> goes through every entry and runs the function with the info<br>
> 
> > sub arguments:
> > <table>
> > <tr>
> > <td> <b>list:</b> </td> <td> <b>pair:</b> </td>
> > </tr>
> > <tr>
> > <td> 
> >
> > <value `Any`> <br> <index `Number`>
> >
> > <br>
> >
> > ```js
> > .forEach( (value, index) => { } );
> > ```
> >
> > </td> <td> 
> >
> > <key `String`> <br> <value `Any`> <br> <index `Number`>
> > ```js
> > .forEach( (key, value, index) => { } );
> > ```
> >
> > </td>
> > </tr>
> > </table>

<br>

<table>
<tr>
<td> <b>list:</b> </td> <td> <b>pair:</b> </td>
</tr>
<tr>
<td>

```js
const { Soup } = require('stews');

let arr = new Soup([ "a", "b" ]);

arr.forEach( (v, i) => {
    console.log(v, i);
});
```

</td>
<td>

```js
const { Soup } = require('stews');

let obj = new Soup({ key1: "val1", key2: "val2" });

obj.forEach( (k, v, i) => {
    console.log(k, v, i);
});
```

</td>
<tr>
<td>

```js
"a" 0
"b" 1 
```

</td>
<td>

```js
"key1" "val1" 0
"key2" "val2" 1
```

</td>
</table>

### [source](https://github.com/shysolocup/stews/blob/main/src/Soup/functions/forEach.js)

<br> <h1> [🢀 Back](https://github.com/shysolocup/stews/wiki/Soup-methods) </h1>