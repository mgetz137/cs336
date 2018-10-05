/*
/Matthew Getz
/homework1
/cs336
/10-5-18
*/

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('site'))
app.use('/static', express.static('site'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
