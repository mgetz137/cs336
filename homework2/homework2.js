/*
/Matthew Getz
/homework2
/cs336
/10-26-18
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
var people = JSON.parse(`
[
    {"id": "0001", "nameFirst": "Matthew", "nameLast":"Getz", "date": "2014-09-24T23:18:10.328Z"},
    {"id": "0002", "nameFirst": "Luke", "nameLast":"Getz", "date": "2010-09-24T23:18:10.328Z"},
    {"id": "0003", "nameFirst": "Joshua", "nameLast":"Getz", "date": "2017-10-01T23:18:10.328Z"},
    {"id": "0004", "nameFirst": "Michal", "nameLast":"Kuyers", "date": "2012-04-08T23:18:10.328Z"},
    {"id": "0005", "nameFirst": "Calvin", "nameLast":"Kuyers", "date": "2018-8-06T23:18:10.328Z"},
]
`);

function GetPerson(id){
    for(i in people) {
        let p = people[i];
        if(isAValidPerson(p)) {
            if(p.id == id){
                return p; 
            }
        }
    }
    return null;
}

function DeletePerson(id){
    people = people.filter((person, idx, arr) => person.id != id);
}

function AddPerson(query) {
    
    let person = {};
    person.id = query.id;
    person.name = query.name;
    person.years = query.years;

    DeletePerson(query.id);

    if(isAValidPerson(person)){
        people.push(person);
        return person;
    }

    return null;
}

function isAValidPerson(person) {
    return (person.id != null && person.name != null && person.years != null);
}

app.use(express.static('public'))

app.get('/people', (req, res) => res.json(people));

app.post('/people', function (req, res) {
    let person = AddPerson(req.body);
    if(person != null) res.sendStatus(200);
    else res.sendStatus(404);
});

app.get('/person/:id', function(req, res) {
    let person = GetPerson(req.params.id);
    if (person != null) res.json(person);
    else res.sendStatus(404);
});

app.put('/person/:id', function (req, res) {
    let person = AddPerson(req.body);
    if(person != null) res.sendStatus(200);
    else res.sendStatus(404);
});

app.post('/person/:id', function (req, res) {
    let person = AddPerson(req.body);
    if(person != null) res.sendStatus(200);
    else res.sendStatus(404);
});

app.delete('/person/:id', function (req, res) {
    DeletePerson(req.params.id);
    res.sendStatus(200);
});

app.get('/person/:id/name', function(req, res) {
    let person = GetPerson(req.params);
    if (person != null && person.name != null) res.json(person.name);
    else res.sendStatus(404);
});

function getYears(id) {
    var today = new Date();
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == id) {
            var startDate = new Date(people[i].startDate)
            var numYears = (Math.floor((today - startDate) / (1000*60*60*24*365)));
            return numYears;
        }
    }
    return '404';
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
