$(function() {

    $("textarea").keyup(function() {
        let maxLength = 140;
        let length = $(this).val().length;
        let count = maxLength - length;
            $(".counter").text(count);
        if (count < 0) {
            $(".counter").css({color:'red'},1000);
        } else {
            $(".counter").css({color:'black'},1000);
        }
    });



});

