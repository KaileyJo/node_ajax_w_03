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
        $el.append('<p>' + info[i].first_name + ' ' + info[i].last_name + '</p>');
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