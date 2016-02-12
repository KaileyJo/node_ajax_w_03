var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//var data = require('./routes/data');
var name = require('./routes/name');
var animals = require('./routes/animals');
var assigner = require('./routes/assigner');

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 5000);
//app.use('/data', data);
app.use('/name', name.name); //2.go to name.name
app.use('/animals', animals.animals);
//app.use('/assigner', assigner);

app.get('/assigner', function(req, res){
    console.log('in assigner route');
    res.send(assigner());
});

app.get('/*', function(req,res) {
    console.log('Here is the request: ', req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
});

app.listen(app.get('port'), function(){
    console.log('Server is ready on port ' + app.get('port'));
});