'use strict';

const allEvents = [
    {
            id: 0,
            activity: 'Class1',
            date: new Date("2019-01-03"),
            week: 1,
            day: 4,
            duration: 2,
    },
];

function getMaxId() {
    let maxID = null;
    for (let i = 0; i < allEvents.length; i += 1) {
        if (!maxID || allEvents[i].id > maxID) {
            maxID = allEvents[i].id;
        }
    }
    return maxID;
}

function getMaxWeek() {
    let maxWeek = null;
    for (let i = 0; i < allEvents.length; i += 1) {
        if (!maxWeek || allEvents[i].week > maxWeek) {
            maxWeek = allEvents[i].week;
        }
    }
    return maxWeek;
}

module.exports = {
    all: allEvents,
    getMaxId,
    getMaxWeek,
};
