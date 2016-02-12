var nameArray = [];
var express = require('express');
var name = express.Router();
var path = require('path');

name.get('/', function(req,res){
    res.send(nameArray); //3.send response to clientapp.js nameArray back for GET, server is done, res ends server
});

name.post('/', function(req,res){
    //console.log(req.body);
    nameArray.push(req.body.name);
    //console.log(nameArray);
    //res.send(req.body.name);
    res.send(nameArray);
});

exports.name = name;
exports.nameArray = nameArray;
//module.exports = name;