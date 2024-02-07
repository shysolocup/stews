const Bean = require('../index.js');


function BeanTimeify(type) {
	let t = this.content.toString().split("");
	let thing = type;

	if ( ["s", "sec", "second", "seconds"].includes(type) ) { return Bean.from(parseFloat(t.join(""))); }
	else if ( ["ms", "msec", "millisecond", "milliseconds"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*1000); }
	else if ( ["m", "min", "minute", "minutes"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60); }
	else if ( ["h", "hr", "hour", "hours"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60); }
	else if ( ["d", "dy", "day", "days" ].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60*24); }
	else if ( ["w", "wk", "week", "weeks"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60*24*7); }
	else if ( ["y", "yr", "year", "years"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60*24*365); }
	else return this;
}


Bean.newF("timeify", BeanTimeify);
Bean.newF("timify", BeanTimeify);
