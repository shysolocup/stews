const Bean = require('../index.js');


function BeanTimeifyMs(type) {
	let t = this.content.toString().split("");
	let thing = type;

	if ( ["s", "sec", "second", "seconds"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*1000); }
	else if ( ["ms", "msec", "millisecond", "milliseconds"].includes(type) ) { return Bean.from(parseFloat(t.join(""))) }
	else if ( ["m", "min", "minute", "minutes"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*1000); }
	else if ( ["h", "hr", "hour", "hours"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60*1000); }
	else if ( ["d", "dy", "day", "days" ].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60*24*1000); }
	else if ( ["w", "wk", "week", "weeks"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60*24*7*1000); }
	else if ( ["y", "yr", "year", "years"].includes(type) ) { return Bean.from(parseFloat(t.join(""))*60*60*24*365*1000); }
	else return this;
}


Bean.newF("timeifyMs", BeanTimeifyMs);
Bean.newF("timifyMs", BeanTimeifyMs);
