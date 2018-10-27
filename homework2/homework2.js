/*Matthew Getz
/homework2
/cs336
*/

var peopleArray = [];


const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');



app.use(express.static("public"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var peopleFile = path.join(__dirname, 'people.json');

fs.readFile(peopleFile, function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    peopleArray = JSON.parse(data);
});

app.get('/people', (req, res) => {
    res.json(peopleArray);
});

app.post('/people', (req, res) => {
    var person = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    };
    peopleArray.push(person);

    var peopleArrayJSON = JSON.stringify(peopleArray);

    fs.writeFile(peopleFile, peopleArrayJSON, function (err) {
        console.log(err)
    });
    res.send({
        'content': 'Added: ' + req.body.firstName + " " + req.body.lastName
    });
});

app.post('/getPerson', (req, res) => {
    var requestedID = req.body.id;
    var person = getPerson(req.body.id);
    if (person != '404') {
        res.send({
            "person": JSON.stringify(person)
        });
    } else {
        res.sendStatus(404);
    }
});

app.get('/person/:id', (req, res) => {

    var response = getPerson(req.params.id);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/person/:id', (req, res) => {
    var idToDelete = req.params.id;

    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == idToDelete) {
            delete peopleArray[i];
            var peopleArrayJSON = JSON.stringify(peopleArray);
            fs.writeFile(peopleFile, peopleArrayJSON, function (err) {
                console.log(err)
            });
            res.send("Person with id: " + idToDelete + " has been removed");
        }
    }
    res.sendStatus(404);

});

app.put('/person/:id', function (req, res) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == req.body.id) {
            peopleArray[i].firstName = req.body.firstName;
            peopleArray[i].lastName = req.body.lastName;
            peopleArray[i].startDate = req.body.startDate;
            var peopleArrayJSON = JSON.stringify(peopleArray);
            fs.writeFile(peopleFile, peopleArrayJSON, function (err) {
                console.log(err)
            });
            res.send(req.body.firstName + " with ID# " + req.params.id + " has been changed");
        }
    }
    res.sendStatus(404);

});

app.get('/person/:id/name', (req, res) => {
    var request = req.params.id;
    var response = getName(request);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

app.get('/person/:id/years', (req, res) => {
    var response = getYears(req.params.id);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
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

function getName(id) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == id) {
            return (peopleArray[i].firstName + " " + peopleArray[i].lastName);
        }
    }
    return '404';
}

function getPerson(id) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id == id) {
            return peopleArray[i];
        }
    }
    return '404';
}

app.all("*", (req, res) => {
    res.sendStatus(404);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
