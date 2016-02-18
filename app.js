var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//var data = require('./routes/data');
//var name = require('./routes/name');
//var animals = require('./routes/animals');
//var assigner = require('./routes/assigner');

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/spirit_animal_assigner';
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/people', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT people.first_name, people.last_name, people.person_id FROM people ORDER BY' +
            ' person_id ASC;');
        //  JOIN animal ON people.animal_id = animal.animal_id
        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            console.log('this is the results: ' + results[0]);
            return res.json(results);
            client.end(); //because we're doing .end here we don't need to do done

        });
        if(err) {
            console.log(err);
        }
    });
});

app.get('/animal', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT animal.animal_name, animal.animal_color, animal.animal_id FROM animal ORDER' +
            ' BY animal_id ASC;');
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            console.log('this is the animal results: ' + results[0]);
            return res.json(results);
            client.end();

        });
        if(err) {
            console.log(err);
        }
    });
});


app.post('/people', function(req, res) {
    var addPerson = {
        firstName: req.body['first-name'],
        lastName: req.body['last-name']

    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO people (first_name, last_name) VALUES ($1, $2)",
            [addPerson.firstName, addPerson.lastName],
            function (err, result) {
                done(); //done closes the connection to the database
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });

});


app.post('/animal', function(req, res) {
    var addAnimal = {
        animal: req.body['spirit-animal'],
        animalColor: req.body['spirit-animal-color']
    };

    console.log('addAnimal object' + addAnimal);

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO animal (animal_name, animal_color) VALUES ($1, $2)",
            [addAnimal.animal, addAnimal.animalColor],
            function (err, result) {
                done(); //done closes the connection to the database
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });

});

app.post('/assign', function(req, res) {
    var assAnimal = {
        animalID: req.body['animal-id-assignment'],
        personID: req.body['personID']
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("UPDATE people SET animal_id = $1 WHERE person_id = $2",
            [assAnimal.animalID, assAnimal.personID],
            function (err, result) {
                done(); //done closes the connection to the database
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });

});

app.set('port', process.env.PORT || 5000);
//app.use('/data', data);
//app.use('/name', name.name); //2.go to name.name
//app.use('/animals', animals.animals);
////app.use('/assigner', assigner);
//
//app.get('/assigner', function(req, res){
//    console.log('in assigner route');
//    res.send(assigner());
//});

app.get('/*', function(req,res) {
    console.log('Here is the request: ', req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
});

app.listen(app.get('port'), function(){
    console.log('Server is ready on port ' + app.get('port'));
});