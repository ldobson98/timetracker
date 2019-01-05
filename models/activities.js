'use strict';

const allActivities = [
    {
        name: 'Class1',
        class: 1,
        job: 0,
        productive: 1,
    },
    {
        name: 'Class2',
        class: 1,
        job: 0,
        productive: 1,
    },
    {
        name: 'Extracurricular',
        class: 0,
        job: 0,
        productive: 1,
    },
    {
        name: 'Job',
        class: 0,
        job: 1,
        productive: 1,
    },
    {
        name: 'Sleep',
        class: 0,
        job: 0,
        productive: 0,
    },
];

function getClasses() {
    let classes = [];
    for (let i = 0; i < allActivities.length; i += 1) {
        if (allActivities[i].class == 1) {
            classes.push(allActivities[i].name);
        }
    }
    return classes;
}

function getJobs() {
    let jobs = [];
    for (let i = 0; i < allActivities.length; i += 1) {
        if (allActivities[i].job == 1) {
            jobs.push(allActivities[i].name);
        }
    }
    return jobs;
}

function getNotProductive() {
    let notProductiveStuff = [];
    for (let i = 0; i < allActivities.length; i += 1) {
        if (allActivities[i].productive == 0) {
            notProductiveStuff.push(allActivities[i].name);
        }
    }
    return notProductiveStuff;
}

function getProductive() {
    let ProductiveStuff = [];
    for (let i = 0; i < allActivities.length; i += 1) {
        if (allActivities[i].productive == 1) {
            ProductiveStuff.push(allActivities[i].name);
        }
    }
    return ProductiveStuff;
}


module.exports = {
    all: allActivities,
    getClasses,
    getJobs,
    getNotProductive,
    getProductive,
};
