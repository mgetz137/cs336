/*Matthew Getz
 *homework1
 *10-5-18
 *JS database
 */

//ignore

// person specs
function Person(Identity, first, last, start){
  this.id = Identity;
  this.nameFirst = first;
  this.nameLast = last;
  this.date = start;
}

// "database"
var peopleArray = JSON.parse(`
[
    {"id": "0001", "nameFirst": "Matthew", "nameLast":"Getz", "date": "2014-09-24T23:18:10.328Z"},
    {"id": "0002", "nameFirst": "Luke", "nameLast":"Getz", "date": "2010-09-24T23:18:10.328Z"},
    {"id": "0003", "nameFirst": "Joshua", "nameLast":"Getz", "date": "2017-10-01T23:18:10.328Z"},
    {"id": "0004", "nameFirst": "Michal", "nameLast":"Kuyers", "date": "2012-04-08T23:18:10.328Z"},
    {"id": "0005", "nameFirst": "Calvin", "nameLast":"Kuyers", "date": "2018-8-06T23:18:10.328Z"},
]
`);

// function for id retrieval
function getName(id) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id = id) {
            return (peopleArray[i].nameFirst + " " + peopleArray[i].nameLast);
        }
    }
    return '404';
}

// function for years worked retrieval
function getYears(id) {
    var today = new Date();
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].id = id) {
            var startDate = new Date(peopleArray[i].date)
            var years = (Math.floor((today - date) / (1000*60*60*24*365)));
            return years;
        }
    }
    return '404';
}

// people route
app.get('/people', (req, res) => {
    res.json(peopleArray);
});

// person/id route
app.get('/person/id', (req, res) => {
    var request = req.params.id;
    var response = getPerson(req.params.id);
    if (response != "404") {
        res.json(response);
    } else {
        res.sendStatus(404);
    }
});

// person/id/years route
app.get('/person/id/years', (req, res) => {
    var response = getYears(req.params.id);
    if (response != "404") {
        res.json(response);
    } else {
        res.sendStatus(404);
    }
});
