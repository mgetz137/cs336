/**
 * CS366 Project
 * Austin Gibson, Daniel Garcia, Matthew Getz
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var db;
var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/maps', function(req, res) {
    console.log('called /api/maps');
    db.collection("maps").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.post('/api/maps', function(req, res) {
    var newMap = {
        mapID: Date.now(),
        title: req.body.title,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        year: req.body.year,
        scale: req.body.scale,
        type: req.body.type
    };
    db.collection("maps").insertOne(newMap, function(err, result) {
        if (err) throw err;
        db.collection("maps").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});

app.get('/api/maps/:mapID', function(req, res) {
    console.log('called /api/maps/id');
    db.collection("maps").find({"mapID": Number(req.params.mapID)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});


app.put('/api/maps/:mapID', function(req, res) {
    var updateId = Number(req.params.mapID);
    var update = req.body;
    db.collection('maps').updateOne(
        { mapID: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("maps").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.delete('/api/maps/:mapID', function(req, res) {
    db.collection("maps").deleteOne(
        {'mapID': Number(req.params.mapID)},
        function(err, result) {
            if (err) throw err;
            db.collection("maps").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});


app.get('/display/:mapID', function(req, res) {
    console.log('called /api/maps/display');
    db.collection("maps").find({"mapID": Number(req.params.mapID)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});


app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// This assumes that the MongoDB password has been set as an environment variable.
var mongoURL = 'mongodb://DACcs336:' +
           process.env.MONGO_PASSWORD +
           '@ds157742.mlab.com:57742/cs336project';
MongoClient.connect(mongoURL, function(err, dbConnection) {
    if (err) throw err;
    db = dbConnection;

    db.collection('maps').find().toArray(function (err, result) {
        if (err) throw err

        console.log(result);
    })
});
