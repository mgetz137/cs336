
/*
/Matthew Getz
/lab07
/cs336
/10-18-18
*/

const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('site'))
app.use('/static', express.static('site'))

app.get('/hello', function(req, res) {
    res.json("Hello, " + req.query.name);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
