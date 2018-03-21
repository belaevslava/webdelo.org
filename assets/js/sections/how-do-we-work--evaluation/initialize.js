(function($) {
    var clickToStartElement = $('#click-to-start--common-evaluation');
    var animation = new commonEvaluation();
    var s         = Snap('#common-evaluation');
    var toggler   = s.select('#chain');

    var startDiag = function () {
        toggler.attr('transform', 'translate(3,5)').animate({transform:'translate(3,13)'}, 300, function () {
            toggler.animate({transform:'translate(3,5)'}, 100, function() {
                var lampToggler = s.select('#lamp-toggler');
                $('#how-do-we-work--evaluation_bg-animation').fadeOut(700);
                lampToggler.animate({ opacity: 0 }, 200);
                setTimeout(function() { lampToggler.remove(); }, 200);
                s.select('#lamp-caption').animate({ opacity: 0 }, 200);
                s.select('#lamp-toggler-caption').animate({ opacity: 0 }, 200);
                animation.onComplete(function () {
                    $('#how-do-we-work--evaluation').addClass('js-diagram-completed');
                }).start();
            });
        });
    };
    toggler.mousedown(startDiag);
})(jQuery);