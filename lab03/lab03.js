
/*
/Matthew Getz
/lab03
/cs336
/9-19-18
*/

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('site'))
app.use('/static', express.static('site'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
