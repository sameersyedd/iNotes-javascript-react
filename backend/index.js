const express = require('express');
var bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/SM_Sameer?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongodb ready to roll'))
    .catch(err => console.log(err))

app.use('/', routes);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});