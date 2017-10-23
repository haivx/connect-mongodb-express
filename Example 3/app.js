const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const index = require('./routes/index')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongobasic')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index)

const port = 8888
app.listen(port, ()=>{
  console.log('Server is running on http://localhost:' + port);
})