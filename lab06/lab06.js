/*
/Matthew Getz
/lab06.js
/10-10-18
/cs336
*/

//requirements
const HttpStatus = require('http-status-codes')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

//using
app.use(express.static('site'))
app.use('/static', express.static('site'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//get
app.get('/request', function(req, res) {
res.send('GET request');
res.sendStatus(HttpStatus.OK);
})

//head
app.head('/request', function(req, res) {
res.send('HEAD request');
res.sendStatus(HttpStatus.ACCEPTED);
})

//post
app.post('/request', function(req, res) {
res.send('POST request');
res.sendStatus(HttpStatus.ACCEPTED);
})

//put
app.put('/request', function(req, res) {
res.send('PUT request');
res.sendStatus(HttpStatus.OK);
})

//delete
app.delete('/request', function(req, res) {
res.send('DELETE request');
res.sendStatus(HttpStatus.ACCEPTED);
})

//forms section
app.get('/forms', (req, res) => {
    res.sendFile('index.html', {
        root: 'public'
    }, (err) => {
        res.end();
s
        if (err) throw (err);
    });
})

app.post('/forms', function (req, res) {
    res.json(req.body);
});

//ignore other options
app.all("*", (req, res) => {
    res.sendStatus(http_status.METHOD_NOT_ALLOWED);
})

//server running on port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
