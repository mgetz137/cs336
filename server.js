/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */



var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MongoClient = require('mongodb').MongoClient;
app.set('port', (process.env.PORT || 3000));
var db;

MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds255463.mlab.com:55463/cs336', function (err, client) {
    if (err) {
        throw err;
    }

    db = client.db('cs336');

    db.collection('comments').find().toArray(function (err, result) {
        if (err) throw err

		db = result;


    })

    app.listen(app.get('port'), function () {
        console.log('Server started: http://localhost:' + app.get('port') + '/');


    })
});


var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});




app.get('/api/comments', function (req, res) {

    var collection = db.collection('comments');
    collection.find({}).toArray(function (err, docs) {
        res.json(docs);
    });
});



app.post('/api/comments', function (req, res) {


    var collection = db.collection('comments');
    collection.insertOne({
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        },
        function (err, result) {
            console.log("Inserted a comment");
            res.json((result));
        });


});
