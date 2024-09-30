# \*\*DEPRECATED\*\*


## Importing
*Note: Some things may not function as intended because of HTML spaghetti*<br>
You can use a website to import the code into your html file. For this example I'll use [cdn.jsdelivr.net](https://cdn.jsdelivr.net) because it's the main one I've gotten to work
```html
<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/nuttmegg/stews/index.js"></script>
	</head>
</html>
```
<br>

## Using
Once you have it imported you can actually start using it for things in scripts
```html
<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/nuttmegg/stews/index.js"></script>
	</head>
	
	<body>
		<script>
			let thing = new Stew( ["a", "b", "c"] );
			
			document.write(thing[1]); // "b"
		</script>
	</body>
</html>
```