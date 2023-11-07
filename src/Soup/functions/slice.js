const Soup = require('../index.js');


function SoupShuffle() {
	// thanks to this https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

	let copy = this.copy()
	let ci = copy.length-1, ri;

	
  	while (ci > 0) {
    	ri = Math.floor(Math.random() * ci);

		
		if (copy.type == "list") {
			let [a, b] = [ copy.get(ci), copy.get(ri) ];
			copy.set(ri, a);
			copy.set(ci, b);
		}

		else if (copy.type == "pair") {
			let [a, b] = [ copy.entries[ci], copy.entries[ri] ];

			let thing = copy.entries;

			[ thing[ri], thing[ci] ] = [ a, b ];

			copy.insides = Object.fromEntries(thing);
		}

		ci--;
  }

  return copy;
}


Soup.newF("shuffle", SoupShuffle);
