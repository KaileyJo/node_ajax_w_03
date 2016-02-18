$(document).ready(function() {
    getData();
    getAnimalData();
    $('#post-people').on('click', postPeople);
    $('#post-animals').on('click', postAnimals);
    $('#name-list').on('click', '.assign-animal', assigningAnimals);
});



function postPeople() {
    event.preventDefault();
    var values = {};

    $.each($('#name-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });


}

function postAnimals() {
    event.preventDefault();
    var values = {};

    $.each($('#animal-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log('aminal values ' + values);

    $.ajax({
        type: 'POST',
        url: '/animal',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from aminal server:', data);
                getAnimalData();
            } else {
                console.log('error');
            }
        }
    });


}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            appendPeople(data);
            console.log('Hellllo data!! ' + data);
        }
    });
}

function getAnimalData() {
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data) {
            appendAnimals(data);
            console.log('Hellllo data!! ' + data);
        }
    });
}

function appendPeople(info) {
    $('#name-list').empty();
    for (var i = 0; i < info.length; i++) {
        $('#name-list').append('<div></div>');
        var $el = $('#name-list').children().last();
        $el.append('<p>' + info[i].first_name + ' ' + info[i].last_name + '</p>'); //form
        $el.append('<form id="' + info[i].person_id + '"><label for="animal-id-assignment">AMINAL ID: </label><input' +
            ' id="animal-id-assignment" type="number" name="animal-id-assignment"></input></form>');
        $el.append('<button class="assign-animal">Assign AMINALS</button>');
        console.log(info[i]);
        console.log(info[i].person_id);

    }
}

function appendAnimals(info) {
    $('#animals-list').empty();
    for (var i = 0; i < info.length; i++) {
        $('#animals-list').append('<div></div>');
        var $el = $('#animals-list').children().last();
        $el.append('<p>' + info[i].animal_name + ' ' + info[i].animal_color + '</p>');
    }
}



//create event listener for .assign-animal class button!!!!!!!!!!!!!!!!!!1

function assigningAnimals() { //AMINALS are being assigned on the DB but not yet appending to DOM :P
    event.preventDefault();

    var id = $(this).siblings('form').attr('id');
    console.log(id);
    var $$$el = $(this).parent().children('p');
    var values = {};

    $.each($('#' + id).serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    values.personID = id;

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/assign',
        data: values,
        beforeSend: console.log(values),
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                //getData();
            } else {
                console.log('error');
            }
        }
    });

    $('#spirit-animal-assignments').append($$$el);
    $('#spirit-animal-assignments').append('<p>You know what you are...</p>');
    $(this).parent().remove();
}





























//var animalsArray = [];
//var nameArray = [];
//
//$(document).ready(function(){
//    //clickPostData();
//    pageReady('name');
//    pageReady('animals');
//    $('#post-data').on('click', clickPostData);
//    //$('#get-data').on('click', getData);
//    $('#assign').on('click', assignAnimals);
//});
//
//function pageReady(fileName) {
//    //On refresh page doesn't display lists, fix this without having empty array spots
//    $.ajax({
//        type: 'GET',
//        url: '/' + fileName, //1.go to node server (app.js)
//        success: function(data) {
//            //array = [];
//            //$('#' + fileName + '-list').empty();
//            console.log(data);
//            for(var i = 0; i < data.length; i++) {
//                $('#' + fileName + '-list').append('<p>' + data[i] + '</p>');
//            }
//        }
//    });
//}
//
//function clickPostData() {
//    event.preventDefault();
//    postData('#name-form', 'name', nameArray); //This doesn't watch for empty strings and records them in the array
//    postData('#animal-form', 'animals', animalsArray); //even if an input field is empty
//}
//
//function postData (form, file, array) {
//    var values = {};
//    $.each($(form).serializeArray(), function(i, field) {
//        values[field.name] = field.value;
//    });
//    $(form).find('input[type=text]').val('');
//    //console.log(values);
//    $.ajax({
//        type: 'POST',
//        url: '/' + file,
//        data: values,
//        success: function(data) {
//            console.log('From Server: ', data);
//            $('#' + file + '-list').empty(); //consider declaring a variable for $('#' + file + '-list')
//            //array.empty();
//            //array.push(data);
//            array = [];
//            for(var i = 0; i < data.length; i++) {
//                $('#' + file + '-list').append('<p>' + data[i] + '</p>');
//                array.push(data[i]);
//                //$(file + 'Array').push(data[i]);
//                //console.log(file + 'Array');
//            }
//            console.log('Here is the ' + file + ' array: ' + array);
//        }
//    });
//    //console.log('Here is the ' + file + ' array: ' + array);
//}
////
////function assignAnimals() {
////    $.ajax({
////        type: 'GET',
////        url: '/assigner',
////        success: function(data) {
////            $('#spirit-animal-assignments').append('<p>' + data + '</p>');
////            console.log(data);
////        }
////    });
////}