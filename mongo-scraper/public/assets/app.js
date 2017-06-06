// GET SCRAPED DATA
$.getJSON("/articles", (data) => {
    if (data != null)
        console.log("Loaded");
});

// CLICK ON ARTICLE
$(document).on('click', 'li', function() {
    var thisId = $(this).attr('data-id');
    $.ajax({
            method: 'GET',
            url: '/articles/' + thisId
        })
        .done((data) => {
            $('#notes').empty();
            $('#notes').attr('data-id', thisId)
            if (data.notes) {
                for (let i = 0; i < data.notes.length; i++) {
                    $('#notes').append('<div class="flex-grid" id="note-' + [i] + '" />');
                    $('#note-' + [i]).append('<div class="col" id="note-inner-' + [i] + '" />');
                    $('#note-inner-' + [i]).append('<h6>' + data.notes[i].title + '</h6>');
                    $('#note-inner-' + [i]).append('<p>' + data.notes[i].body + '</p>');
                    $('#note-' + [i]).append('<button class="waves-effect waves-light btn" data-id="' + data.notes[i]._id + '" id="deletenote">X</button>');
                }
                $('#notes').append('<input id="titleinput" name="title" placeholder="Title A New Note">');
                $('#notes').append('<textarea id="bodyinput" name="body" placeholder="Type A New Note"></textarea>');
                $('#notes').append('<button class="waves-effect waves-light btn" data-id="' + data._id + '" id="savenote">Save Note</button>');
            }
        });
});

// SAVE NOTE
$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val()
            }
        })
        .done(function(data) {
            console.log(data.notes);
            $("#notes").empty();
            if (data.notes) {
                for (let i = 0; i < data.notes.length; i++) {
                    $('#notes').append('<h6>' + data.notes[i].title + '</h6>');
                    $('#notes').append('<p>' + data.notes[i].body + '</p>');
                }
                $('#notes').append('<input id="titleinput" name="title" placeholder="Title A New Note">');
                $('#notes').append('<textarea id="bodyinput" name="body" placeholder="Type A New Note"></textarea>');
                $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');
            }
        });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

// DELETE NOTE
$(document).on('click', '#deletenote', function() {
    var thisId = $(this).attr('data-id');
    $.ajax({
            method: 'DELETE',
            url: '/articles/' + thisId,
            data: {
                parent: $('#notes').attr("data-id")
            }
        })
        .done(function(data) {
            if (data.notes) {
                $('#notes').empty();
                for (let i = 0; i < data.notes.length; i++) {
                    $('#notes').append('<h6>' + data.notes[i].title + '</h6>');
                    $('#notes').append('<p>' + data.notes[i].body + '</p>');
                }
                $('#notes').append('<input id="titleinput" name="title" placeholder="Title A New Note">');
                $('#notes').append('<textarea id="bodyinput" name="body" placeholder="Type A New Note"></textarea>');
                $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');
            }
        });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

// DELETE ARTICLE
$(document).on('click', '#deletearticle', function() {
    var thisId = $(this).attr('data-id');
    $.ajax({
        method: 'DELETE',
        url: '/articles/',
        data: {
            id: thisId
        }
    }).done(function(data) {
        if (data != null) {
            location.reload();
        }
        console.log("Loaded");
    });
});