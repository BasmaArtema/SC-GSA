$(document).ready(function() {

    $('#editable').keyup(function() {
        $('#content').val($('#editable').html());
    });

    $('#newBlogPost').validate({
        rules: {
            title: "required",
            content: "required"
        },
        messages: {
            title: "Please enter a title.",
            content: "Please enter content."
        },
        submitHandler: function() {

            var data = {};
            data.post_date = new Date();
            data.title = $('#title').val();
            data.content = $('#content').val();

            JSON.stringify(data);

            console.log('data ',data);

            jQuery.post(
                '/blog/create',
                data,
                function(data) {
                    window.location = '/blog/'+data.post_id;
                },
                'json'
            );
        }
    });

    $('.postDiv').click(function() {
        var id = $(this).data("id");
        window.location = '/blog/'+id;
    });

    $('#deletePost').click(function() {
        var id = $('#postId').val();
        console.log('id to delete ', id);
        $.ajax({
            type: 'DELETE',
            url: '/blog/'+id,
            success: function(data) {
                console.log('success');
                console.log(data);
                window.location = '/blog';
            },
            error: function(error) {
                console.log('error');
                console.log(error);
                window.location = '/blog';
            }
        });
    });


//$('#editBlogPost').submit(function() {
//
//    event.preventDefault();
//    $('#content').val($('#editable').html());
//
//    var data = {};
//    data.post_date = new Date();
//    data.title = $('#title').val();
//    data.content = $('#content').val();
//
//    var id = $('#oldId').val();
//
//    JSON.stringify(data);
//
//    console.log('data ',data);
//
//    $.ajax({
//        type: 'PUT',
//        url: '/blog/'+id,
//        data: data,
//        dataType: 'json',
//        success: function(data) {
//            console.log('success');
//            console.log(data);
//        },
//        error: function(error) {
//            console.log('error');
//            console.log(error.error);
//        }
//    });
//});
});
