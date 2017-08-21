/* Scroll to Top */

$(".totop").hide();


$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.totop').fadeIn();
        }
        else {
            $('.totop').fadeOut();
        }
    });

    $('.totop a').click(function (e) {
        e.preventDefault();
        $('body,html').animate({ scrollTop: 0 }, 500);
    });

});