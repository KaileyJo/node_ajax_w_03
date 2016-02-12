var nameArray = require('./name').nameArray;
var animalsArray = require('./animals').animalsArray;

console.log('I may or may not be the name: ' + nameArray);

var assigner = function(){
    var randomName = Math.floor(Math.random() * nameArray.length);
    console.log('this is the random number :' + randomName);
    randomName = nameArray[randomName];
    console.log(randomName);
    var randomAnimal = Math.floor(Math.random() * animalsArray.length);
    console.log('this is the other random number :' + randomAnimal);
    randomAnimal = animalsArray[randomAnimal];
    //var assigned = [randomName, randomAnimal];
    return randomName + '\'s spirit animal is a(n) ' + randomAnimal;
    //console.log(assigned);
};

module.exports = assigner;