var animalsArray = [];
var nameArray = [];

$(document).ready(function(){
    //clickPostData();
    pageReady('#name-form', 'name', nameArray);
    pageReady('#animal-form', 'animals', animalsArray);
    $('#post-data').on('click', clickPostData);
    //$('#get-data').on('click', getData);
    $('#assign').on('click', assignAnimals);
});

function pageReady(form, file, array) {
    //On refresh page doesn't display lists, fix this without having empty array spots
    $.ajax({
        type: 'GET',
        url: '/' + file, //1.go to node server (app.js)
        success: function(data) {
            //array = [];
            //$('#' + file + '-list').empty();
            console.log(data);
            for(var i = 0; i < data.length; i++) {
                $('#' + file + '-list').append('<p>' + data[i] + '</p>');
            }
        }
    });
}

function clickPostData() {
    event.preventDefault();
    postData('#name-form', 'name', nameArray);
    postData('#animal-form', 'animals', animalsArray);
}

function postData (form, file, array) {
    var values = {};
    $.each($(form).serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    $(form).find('input[type=text]').val('');
    //console.log(values);
    $.ajax({
        type: 'POST',
        url: '/' + file,
        data: values,
        success: function(data) {
            console.log('From Server: ', data);
            $('#' + file + '-list').empty();
            //array.empty();
            //array.push(data);
            array = [];
            for(var i = 0; i < data.length; i++) {
                $('#' + file + '-list').append('<p>' + data[i] + '</p>');
                array.push(data[i]);
                //$(file + 'Array').push(data[i]);
                //console.log(file + 'Array');
            }
            console.log('Here is the ' + file + ' array: ' + array);
        }
    });
    //console.log('Here is the ' + file + ' array: ' + array);
}

function assignAnimals() {
    $.ajax({
        type: 'GET',
        url: '/assigner',
        success: function(data) {
            $('#spirit-animal-assignments').append('<p>' + data + '</p>');
            console.log(data);
        }
    });
}