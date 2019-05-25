$(document).ready(function () {

    $('#act_rule').click(function () {
        $('#modal_rules').show();
    });
    $('#progress').click(function () {
        $('#modal_progress').show();
    });

    $('#modal_rules_content').click(function () { 
        return false;
    })
    $('#modal_rules').click(function () { $(this).hide() })

    $('#modal_progress_content').click(function () { 
        return false;
    })
    $('#modal_progress').click(function () { $(this).hide() })
});