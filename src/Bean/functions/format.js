const Bean = require('../index.js');


function BeanFormat(settings={}) {
	if (!settings.roundTo) settings.roundTo = 0;
	if (!settings.currency) settings.currency = "";

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: settings.roundTo
    });

    return formatter.format(this.content).replace("$", settings.currency);
}


Bean.newF("format", BeanFormat);
