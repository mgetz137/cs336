//script.js
$(document).ready(function () {
    // FORM ADD PERSON
    $('#add').submit(function (event) {
        event.preventDefault();

        var form = $(this);

        $.ajax({
                type: 'POST',
                url: '/people',
                data: form.serialize(),
                dataType: 'json',
            }).done(function (resp) {
                var response = resp.content;
                $("#responseHere").html(response);
            })
            .fail(function (xhr, status, errorThrown) {
                $("#responseHere").html("ERROR: " + errorThrown);
            })
    });


    // FORM GETPERSON
    $('#get').click(function (event) {
        event.preventDefault();

        var form = $(this);
        $.ajax({
                type: 'POST',
                url: '/getPerson',
                data: {
                    id: $("#id").val()
                },
            })
            .done(function (resp) {
                person = JSON.parse(resp.person);
                $("#personResult").html('Name: ' + person.firstName + " " + person.lastName + " on StartDate: " + person.startDate + " with ID#: " + person.id);
            })
            .fail(function (xhr, status, errorThrown) {
                $("#personResult").html("ERROR: " + errorThrown);
            })
    });

});
