//This is a module, but not a route, it would perhaps be better placed in a modules folder than the routes folder


var nameArray = [];
var express = require('express');
var name = express.Router();
var path = require('path');

name.get('/', function(req,res){
    res.send(nameArray); //3.send response to clientapp.js nameArray back for GET, server is done, res ends server
});

name.post('/', function(req,res){
    //console.log(req.body); //could do if statement here to check if there is an empty '' so empty strings aren't
    //nameArray.push(req.body.name); //pushed to the array
    if(req.body.name !== ''){
        nameArray.push(req.body.name);
    }
    //console.log(nameArray);
    //res.send(req.body.name);
    res.send(nameArray);
});

exports.name = name;
exports.nameArray = nameArray;
//module.exports = name;