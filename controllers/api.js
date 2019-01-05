const allEvents = require('../models/events.js');

function listEvents(request, response) {
    const phrase = request.query.search;
    var events = new Array();
    if (phrase == null) {
        var j = 0;
        for (var i = 0; i < allEvents.all.length; i++) {
                var event = allEvents.all[i];
                const day = pad(event.date.getUTCDate());
                const month = pad(event.date.getUTCMonth()+1);
                const year = event.date.getFullYear();
                const details = {
                    id: event.id,
                    activity: event.activity,
                    date: year+"-"+month+"-"+day,
                    week: event.week,
                    day: event.day,
                    duration: event.duration,
                };
            events[j] = details;
            j++;
        }
    } else {
        var j = 0;
        for (var i = 0; i < allEvents.all.length; i++) {
            if (allEvents.all[i].activity.toLowerCase().includes(phrase.toLowerCase())) {
                var event = allEvents.all[i];
                const day = pad(event.date.getUTCDate());
                const month = pad(event.date.getUTCMonth()+1);
                const year = event.date.getFullYear();
                const details = {
                    id: event.id,
                    activity: event.activity,
                    date: year+"-"+month+"-"+day,
                    week: event.week,
                    day: event.day,
                    duration: event.duration,
                };
                events[j] = details;
                j++;
            }
        }
    }
    
    const output = {
        events: events,
    }
    
    response.send(output);
    
}

function addEvents(request, response) {
    const input = JSON.parse(request.query.add);
    const events = input.events;
    console.log(input);

    for (let i = 0; i < events.length; i++) {
        if (!events[i].activity || !events[i].date || !events[i].week || !events[i].day || !events[i].duration) {
            response.send("ERROR: Event"+i+" is not formatted correctly.  No dates imported.");
        }
    }

    for (let i = 0; i < events.length; i++) {
        
        const date1 = new Date(events[i].date);
        console.log(events[i].date);
        console.log(date1);

        const newEntry = {
            id: allEvents.getMaxId() + 1,
            activity: events[i].activity,
            date: date1,
            week: events[i].week,
            day: events[i].day,
            duration: events[i].duration,
        }

        allEvents.all.push(newEntry);
        console.log(allEvents.all);
    }

    response.send("SUCCESS: All events imported successfully.");


}

//From Stack Exchange: https://stackoverflow.com/questions/8089875/show-a-leading-zero-if-a-number-is-less-than-10
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

module.exports = {
    listEvents,
    addEvents,
};
