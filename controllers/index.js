const allEvents = require('../models/events.js');
const allActivities = require('../models/activities.js');
const productive = allActivities.getProductive();
const weekOffset = 0; //Change this for the starting week of the semester.

function index(request, response) {
    const contextData = {
        title: 'Timetracker - Track How You Spend Your Time',
        events:allEvents.all,
        errors:[],
        successes:[],
        activities: allActivities.all,
        chartData:[],
        classData:[],
        productiveData:[],
        sleepData:[],
    };

    if (request.method === "POST") {
    	var errors = [];
    	var successes = [];

    	const date1 = new Date(request.body.inputDate);

    	const newEntry = {
    		id: allEvents.getMaxId() + 1,
    		activity: request.body.inputActivity,
    		date: date1,
    		week: date1.getWeek() - weekOffset,
    		day: date1.getUTCDay(),
    		duration: parseFloat(request.body.inputDuration),
    	}

    	if (!newEntry.activity) {
    		errors.push('Your activity must be in a category.')
    	}
    	if (!newEntry.date) {
    		errors.push('Your activity must have a date.')
    	}
    	if (!newEntry.duration) {
    		errors.push('Your activity must have a duration.')
    	}

    	if (errors.length === 0) {
    		allEvents.all.push(newEntry);
    		//Display success message
    		var s = (newEntry.duration==1 ? "" : "s")
    		successes.push("Your time (" + newEntry.duration + " hr"+s+") spent at " + newEntry.activity + " has been recorded.");
    	}

    	contextData.successes = successes;
    	contextData.errors = errors;

    }

    //CHART DATA
	    const maxWeek = allEvents.getMaxWeek();
	    var chartData = [];
	    chartData.push([]);
	    chartData[0][0] = "Week";
	    for (let i = 1; i <= productive.length; i++) {
	    	chartData[0][i] = productive[i-1];
	    }

	    //each week (row)
	    for (let i = 1; i <= maxWeek; i++) {
	    	row = [];
	    	row.push(i);
	    	//each activity (column)
	    	for (let j = 0; j < productive.length; j++) {
	    		var hours = 0;
	    		//sum hours for the week
	    		for (let k = 0; k < allEvents.all.length; k++) {
	    			if (allEvents.all[k].activity == productive[j] && allEvents.all[k].week == i) {
	    				hours += allEvents.all[k].duration;
	    			}
	    		}
	    		row.push(hours);
	    	}
	    	chartData.push(row);
	    }

	//CLASSES PIE CHART
		var classData = [];
		classData.push(['Activity','Hours']);
		//each activity (row)
		for (let i = 0; i < allActivities.all.length; i++) {
			var hours = 0;
			//sum hours for the activity
			for (let j = 0; j < allEvents.all.length; j++) {
				if (allEvents.all[j].activity == allActivities.all[i].name && allActivities.all[i].class == 1) {
					hours += allEvents.all[j].duration;
				}
			}
			classData.push([allActivities.all[i].name, hours]);
		}

	//PRODUCTIVE PIE CHART
		var productiveData = [];
		productiveData.push(['Activity','Hours']);
		//each activity (row)
		for (let i = 0; i < allActivities.all.length; i++) {
			var hours = 0;
			//sum hours for the activity
			for (let j = 0; j < allEvents.all.length; j++) {
				if (allEvents.all[j].activity == allActivities.all[i].name && allActivities.all[i].productive == 1) {
					hours += allEvents.all[j].duration;
				}
			}
			productiveData.push([allActivities.all[i].name, hours]);
		}

	//SLEEP CHART
		var sleepData = [];
		sleepData.push(['Week','Hours']);
		//each week (row)
		for (let i = 0; i < maxWeek; i++) {
			var hours = 0;
			//sum hours for sleep
			for (let j = 0; j < allEvents.all.length; j++) {
				if (allEvents.all[j].activity == "Sleep" && allEvents.all[j].week == i+1) {
					hours += allEvents.all[j].duration;
				}
			}
			sleepData.push([i+1, hours]);
		}

    console.log(chartData);
    contextData.chartData = chartData;
    contextData.classData = classData;
    contextData.productiveData = productiveData;
    contextData.sleepData = sleepData;
    response.render('index', contextData);
}   

// GET WEEK NUMBER FUNCTION: https://stackoverflow.com/questions/9045868/javascript-date-getweek
/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

module.exports = {
    index,
};
