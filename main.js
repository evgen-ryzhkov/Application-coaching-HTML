$(document).ready(function(){

    /* Review slider ------------------- */
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

    /* FAQ ------------------------------ */
    $(".open-icon, .home-ul2 h3").on("click", function() {
        var parent = $(this).parent('li');
        var textElem = parent.find('p');
        var iconElem = parent.find('.open-icon');

        if(iconElem.hasClass('close-icon')) {
            iconElem.removeClass('close-icon');
            textElem.addClass('hidden-text');
        } else {
            iconElem.addClass('close-icon');
            textElem.removeClass('hidden-text');
        }
    });

    /* CTA --------------------------- */
    $(".home-cta .button").on("click", function() {
        var ctaId = $(this).data('cta-id');
        $('#' + ctaId).fadeIn();

    });

     $(".home-cta-form .close-icon, #form-success .button").on("click", function() {
        $(this).closest('.home-cta-form').fadeOut();
    });

     $('#customerPhone').on('focus', function(){
        if (!this.value) {
          this.value = '+49 ';
        }
      });

      $('#customerPhone').mask('+00 0000 0000000', {
        translation: {
          '0': { pattern: /[0-9*]/ }
        }
      });

    $('.next-button').on('click', function(e) {
        var $step = $(this).closest('.form-step'),
            isValid = true;

        // form validation
        $step.find('input, select').each(function() {
          if (!this.checkValidity()) {
            $(this).addClass('invalid');
            isValid = false;
          } else {
            $(this).removeClass('invalid');
          }
        });



        if (!isValid) {
          return;
        }

        // Hide current step, show next step
        $step.hide().next('.form-step').show();
  });

  $('.prev-button').on('click', function(e) {
    $(this).closest('.form-step').hide().prev('.form-step').show();
  });

});
