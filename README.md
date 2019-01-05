# Timetracker

## About

This quickly-built app allows you to enter time spend on different tasks and shows you how your time is spent.  I've previously done this in Excel, but wanted to migrate over to an app for the upcoming semester.

## How to Use

1. Clone app and install dependencies.
2. Open ```models/activities.js``` and change my activities to yours.  
3. ```npm start``` and you're good to go!

## API

Timetracker allows you to export and import all your events (all recorded activites) by utilizing the following structure:

To export all events, when the app is running go to ```/api/events``` and all events will be displayed.  A basic search functionality is also implemented, which can be activated by using the structure ```/api/events?search={ACTIVITY}```, which searches by a specific activity name.

To import events, when the app is running go to ```/api/add?add={EVENTS}```, where the ```{EVENTS}``` tag is the same style as the export API.  I created this to make exporting and reimporting events super easy in case I needed to stop/change a piece of the app.

## Viewing Raw Data in HTML

Timetracker also allows you to view all events in an HTML table, which could be useful for copying/pasting into Excel for further analysis.  To access this, go to ```/table``` when the app is running.  Entries are displayed in the order in which they're stored.

## Future Updates

This needed a quick turnaround time, so I opted to store everything in Javascript arrays instead of implementing a database.  My next goal (probably over the summer) will be to utilize a database structure instead.