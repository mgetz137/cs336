/*

/Matthew Getz

/homework1

/cs336

/10-5-18

*/


const express = require('express')

const app = express()

const port = 3000



// person specs

function Person(Identity, first, last, start){

  this.id = Identity;

  this.nameFirst = first;

  this.nameLast = last;

  this.date = start;

}


// "database"

var people = [

    {"id": "0001", "nameFirst": "Matthew", "nameLast":"Getz", "date": "2014-09-24T23:18:10.328Z"},

    {"id": "0002", "nameFirst": "Luke", "nameLast":"Getz", "date": "2010-09-24T23:18:10.328Z"},

    {"id": "0003", "nameFirst": "Joshua", "nameLast":"Getz", "date": "2017-10-01T23:18:10.328Z"},

    {"id": "0004", "nameFirst": "Michal", "nameLast":"Kuyers", "date": "2012-04-08T23:18:10.328Z"},

    {"id": "0005", "nameFirst": "Calvin", "nameLast":"Kuyers", "date": "2018-8-06T23:18:10.328Z"},

];


// retrieves the person object from the database with the id specified in the url

function GetPerson(params){

    for(i in people) {

        let person = people[i];

        if(person.id == params.id){

            return person;

        }

    }

    return null;

}


app.use(express.static('public'))


app.get('/people', (req, res) => res.json(people));


app.get('/person/:id', function(req, res) {

    let person = GetPerson(req.params);

    if (person != null) res.json(person);

    else res.sendStatus(404);

});


app.get('/person/:id/name', function(req, res) {

    let person = GetPerson(req.params);

    if (person != null && person.nameFirst != null) res.json(person.nameFirst + " " + person.nameLast);

    else res.sendStatus(404);

});


function getYears(id) {

    var today = new Date();

    for (var i = 0; i < peopleArray.length; i++) {

        if (peopleArray[i].id == id) {

            var startDate = new Date(peopleArray[i].startDate)

            var years = (Math.floor((today - startDate) / (1000 * 60 * 60 * 24 * 365)));

            return years;

        }

    }

    return '404';

}


app.get('/person/:id/years', function(req, res){

    let person = GetPerson(req.params);

    if (person != null && person.date != null) res.json(person.getYears);

    else res.sendStatus(404);

});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
