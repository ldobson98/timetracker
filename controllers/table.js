const eventModels = require('../models/events.js');

function table(request, response) {

	var allEvents = eventModels.all;
	for (let i = 0; i < allEvents.length; i++) {
		const day = pad(allEvents[i].date.getUTCDate());
        const month = pad(allEvents[i].date.getUTCMonth()+1);
        const year = allEvents[i].date.getFullYear();
        allEvents[i].date1 = year+"-"+month+"-"+day;
	}

	var sendEvents = [];
	for (let i = 0; i < allEvents.length; i++) {
		var row = {
			week: allEvents[i].week,
			date: allEvents[i].date1,
			activity: allEvents[i].activity,
			duration: allEvents[i].duration,
		}
		sendEvents.push(row);
	}

    const contextData = {
        title: "Table of All Events",
        events: sendEvents,
    };
    response.render('table', contextData);
};

//From Stack Exchange: https://stackoverflow.com/questions/8089875/show-a-leading-zero-if-a-number-is-less-than-10
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}
    
module.exports = {
    table,
};