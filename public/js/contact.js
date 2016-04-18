function closeAccord(item){
    $(item).collapse("hide");
}
function validateCheckbox() {
    if ($('#checkbox1').is(':checked')) {

        $('#name').removeAttr('required');
    }
    else {

        $('#name').attr('required');
        $('#name').prop('required', true);
    }

}
function validate() {
    if ($('#checkbox1').is(':checked')) {
        $('#name').removeAttr('required');
    }
    else {
        $('#name').prop('required', true);
        $('#form').validate();
    }
}

$(document).ready(function() {
    $('#form #submit').click(function(event) {
        event.preventDefault();
        var data = 'test data';
        jQuery.post(
            '/contact',
            data,
            function(data) {
                console.log('data ', data);
                //window.location = '/contact';
            },
            'json'
        );
    });
});