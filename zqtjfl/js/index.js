$(document).ready(function () {

    $('#act_rule').click(function () {
        $('#modal_rules').show();
    });
    $('#progress').click(function () {
        $('#modal_progress').show();
    });

    $('#close_rules').click(function () { $("#modal_rules").hide() })


    $('#close_progress').click(function () { $("#modal_progress").hide() })
});