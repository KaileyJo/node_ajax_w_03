var animalsArray = [];
var express = require('express');
var animals = express.Router();
var path = require('path');

animals.get('/', function(req,res){
    res.send(animalsArray); //client requests, server responds. On send server is done
});

animals.post('/', function(req,res){
    //console.log(req.body);
    animalsArray.push(req.body['spirit-animal']);
    //console.log(animalsArray);
    //res.send(req.body['spirit-animal']);
    res.send(animalsArray);
});

exports.animals = animals;
exports.animalsArray = animalsArray;
//module.exports = animals;