require('dotenv').config()
const express = require('express')
const app = express()
app.listen(process.env.PORT)
console.log('Server is listening on port ' + process.env.PORT)
app.use(express.static('./'))
app.get('/', (req, res) => {
    res.render('index.html')
})