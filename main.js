$(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.slider-prev'),
        nextArrow: $('.slider-next'),
        responsive: [
            {
                breakpoint: 600, /* breakpoint at 600px for mobile devices */
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $(".open-icon, .home-ul2 h3").on("click", function() {
        var parent = $(this).parent('li');
        var textElem = parent.find('p');
        var iconElem = parent.find('.open-icon');

        if(iconElem.hasClass('close-icon')) {
            // If section is open, close it
            iconElem.removeClass('close-icon');
            textElem.addClass('hidden-text');
        } else {
            // If section is closed, open it
            iconElem.addClass('close-icon');
            textElem.removeClass('hidden-text');
        }
    });

});
