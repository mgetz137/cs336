/*

/Matthew Getz

/homework1

/cs336

/10-5-18

*/


const express = require('express')

const app = express()

const port = 3000

const bodyParser = require("body-parser")

var fs = require('fs')

var path = require('path')


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));


//people saved into a json file

var peopleList = path.join(__dirname, 'people.json');

var peopleArray = [];


//reading json file of people

fs.readFile(peopleList, function (err, data) {

    if (err) {

        console.error(err);

        process.exit(1);

    }

    peopleArray = JSON.parse(data);

});


// person specs

function Person(Identity, first, last, start){

  this.id = Identity;

  this.nameFirst = first;

  this.nameLast = last;

  this.date = start;

}


function getPerson(id) {

    for (var i = 0; i < peopleArray.length; i++) {

        if (peopleArray[i].id == id) {

            return peopleArray[i];

        }

    }

    return '404';

}


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


app.use(express.static('public'))


app.get('/people', (req, res) => {

    res.json(peopleArray);

});


app.post('/people', (req, res) => {

    var person = {

        id: req.body.id,

        firstName: req.body.nameFirst,

        lastName: req.body.nameLast,

        startDate: req.body.date

    };

    peopleArray.push(person);


    var peopleArrayJSON = JSON.stringify(peopleArray);


    fs.writeFile(peopleList, peopleArrayJSON, function (err) {

        console.log(err)

    });

    res.send({

        'content': 'Added: ' + req.body.firstName + " " + req.body.lastName

    });

});



app.get('/person/:id', (req, res) => {


    var response = getPerson(req.params.id);

    if (response != "404") {

        res.send(response);

    } else {

        res.sendStatus(404);

    }

});


app.put('/person/:id', function (req, res) {

    for (var i = 0; i < peopleArray.length; i++) {

        if (peopleArray[i].id == req.body.id) {

            peopleArray[i].nameFirst = req.body.nameFirst;

            peopleArray[i].nameLast = req.body.nameLast;

            peopleArray[i].date = req.body.date;

            var peopleArrayJSON = JSON.stringify(peopleArray);

            fs.writeFile(peopleFile, peopleArrayJSON, function (err) {

                console.log(err)

            });

            res.send(req.body.nameFirst + " with ID# " + req.params.id + " has been changed");

        }

    }

    res.sendStatus(404);


});


app.get('/person/:id/name', function(req, res) {

    let person = GetPerson(req.params);

    if (person != null && person.nameFirst != null) res.json(person.nameFirst + " " + person.nameLast);

    else res.sendStatus(404);

});


app.get('/person/:id/years', function(req, res){

    let person = GetPerson(req.params);

    if (person != null && person.date != null) res.json(person.getYears);

    else res.sendStatus(404);

});


//Here is the added stuff

app.delete('/person/:id', (req, res) => {

    var toDelete = req.params.id;


    for (var i = 0; i < peopleArray.length; i++) {

        if (peopleArray[i].id == toDelete) {

            delete peopleArray[i];

            var peopleArrayJSON = JSON.stringify(peopleArray);

            fs.writeFile(peopleFile, peopleArrayJSON, function (err) {

                console.log(err)

            });

            res.send("Person " + toDelete + " deleted");

        }

    }

    res.sendStatus(404);


});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


