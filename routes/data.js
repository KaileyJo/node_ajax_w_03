//not currently in use
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req,res){
    res.send({message: 'hello'});
});

router.post('/', function(req,res){
    //console.log(req.body);
    res.send(req.body.name + ' ' + req.body['spirit-animal']);
});

//module.exports = router;
