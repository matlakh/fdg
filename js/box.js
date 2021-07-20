$(document).ready(function() {
    $("a[data-jump^='#']").click(function() {
        var _href = $(this).attr("data-jump");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });
    $('.boxes > div').click(function() {
        if ($(this).parent().hasClass('boxesfirsttry')) {
            $('.boxes').removeClass('boxesfirsttry');
            $(this).addClass('openbox');
            $(this).find('.try').hide();
            $(this).find('.opentry').show();
            setTimeout(function() {
                $('.sweet-overlay').show();
                $('.sweet-alert').show();
            }, 500);
        } else if ($(this).parent().hasClass('boxeslasttry')) {
            if (!$(this).hasClass('openbox')) {
                $(this).find('.try').hide();
                $(this).find('.opentry').show();
                $(this).find('.boxtext').css('display', 'block');
                setTimeout(function() {
                    if ($(".new-comebacker-overlay").is(":visible")) $(".new-comebacker-overlay").hide();
                    $(".new-comebacker-overlay .boxes-is-open").show();
                    $(".new-comebacker-overlay .boxes-not-open").hide();
                    $('.spin-result-wrapper').show();
                    setTimeout(function() {
                        $('#boxesContainer').slideUp(250);
                        setTimeout(function() {
                            $('.order_block').slideDown(250);
                        }, 500);
                    }, 500);
                }, 500);
            }
        }
    });
    $('#update').click(function() {
        $('.sweet-overlay').hide();
        $('.sweet-alert').hide();
        $('.boxes').addClass('boxeslasttry');
    });
    $('.pop-up-button, .close-popup').click(function() {
        $('.spin-result-wrapper').hide();
        $('#countdown, #countdown-modal').timeTo({
            seconds: 180
        });
    });
});