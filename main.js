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

     $(".home-cta-form .close-icon, .form-success .button").on("click", function() {
        $(this).closest('.home-cta-form').fadeOut();
    });

     $('.customerPhone').on('focus', function(){
        if (!this.value) {
          this.value = '+49 ';
        }
      });

      $('.customerPhone').mask('+00 0000 0000000', {
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

            // Additional check for phone number field
            if ($(this).hasClass('customerPhone') && $(this).val().length < 9) {
                $(this).addClass('invalid');
                isValid = false;
            }
          }
        });

        if (!isValid) {
          return;
        }

        // Hide current step, show next step
        $step.hide().next('.form-step').show();

        // Find the next progress bar step and make it active
        let currentProgressBarStep = $(this).parents('.home-form-wrap').find('.progress-bar__step-active').last(),
            $nextProgressBarStep = currentProgressBarStep.nextAll('.progress-bar__step:first'),
            $nextProgressBarSpacer = currentProgressBarStep.next('.progress-bar__spacer');

        $nextProgressBarStep.addClass('progress-bar__step-active');
        $nextProgressBarSpacer.addClass('progress-bar__spacer-active');

  });

  $('.prev-button').on('click', function(e) {
    $(this).closest('.form-step').hide().prev('.form-step').show();

    // Find the current progress bar step and remove active class from it
    let $currentProgressBarStep =  $(this).parents('.home-form-wrap').find('.progress-bar__step-active').last(),
        $prevProgressBarSpacer = $currentProgressBarStep.prev('.progress-bar__spacer');

    $currentProgressBarStep.removeClass('progress-bar__step-active');
    $prevProgressBarSpacer.removeClass('progress-bar__spacer-active');

  });

  $('.datetimepicker').datetimepicker({
    format:'d.m.Y H:i'
  });

  $('form.home-form').on('submit', function(e) {
      e.preventDefault();

      var url = $(this).attr('action'),
          errorMessage = $(this).attr('data-error-message'),
          formData = $(this).serialize(),
          form = $(this);

      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        success: function(response) {
            let homeFormWrap = form.parent('.home-form-wrap');
            homeFormWrap.addClass('hidden');
            homeFormWrap.next('.form-success').removeClass('hidden');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Code to run if the request fails; see details below.
          console.log('Form submission failed: ' + textStatus, errorThrown);
          alert(errorMessage);
        }
      });

  });

});
