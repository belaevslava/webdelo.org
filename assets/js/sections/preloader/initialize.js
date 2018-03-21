var timeOut;
function toggleFullScreen(e) {
    e.preventDefault();
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        timeOut = 1;
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
disableScroll();
window.preloader = new preloaderClass();
window.preloader
    .onComplete(function () {
        $('.percent-caption').fadeOut(600, function () {
            $('#fullscreen-mode').removeClass('opacity-0');

            var timeToStartElement = $('#time-to-start'),
                timeToStartPresentation = window.setInterval(function() {
                    if (timeOut <= 1 ) {
                        $('body')
                            .removeClass('preloader-inited')
                            .addClass('preloader-complete');

                        $('.line-container .line').animate({ height: 0, top: '+=2'}, 300, function () {
                            $('.preloader .after').animate({ top: '2000px'}, 1400, function () {$('.preloader').fadeOut()});
                            $('.preloader .before').animate({ top: '-2000px'}, 1400, function () {$('.preloader').fadeOut()});

                            var clientsCount = new CountUp($('#clientsCount')[0], 0, parseInt($('#clientsCount').data('to')), -1, 1, {useGrouping:false});
                            clientsCount.start();
                            var apCount = new CountUp($('#appartmentsCount')[0], 0, parseInt($('#appartmentsCount').data('to')), -1, 1, {useGrouping:false});
                            apCount.start();
                            var ordersCount = new CountUp($('#ordersCount')[0], 0, parseInt($('#ordersCount').data('to')), -1, 1, {useGrouping:false});
                            ordersCount.start();

                            enableScroll();
                        });
                        window.clearInterval(timeToStartPresentation);
                    }

                    // 5000
                    timeOut = (window.innerWidth < 992) ? 1 : timeToStartElement.text() - 1;
                    timeToStartElement.text(timeOut);
            }, 1000);
        });
    }).onChange(function (percent, oldPercent) {
        $('.preloader .line').animate({'width': percent+'%'}, 500);
        $('.percent-caption').fadeIn(200);
        var demo = new CountUp('percent-caption-value', oldPercent, percent, 0, (percent-oldPercent)/3000);
        demo.start();
    }).start();

$(document).ready(function() {
    window.preloader.complete();
    document.querySelector('#enable_fullscreen').addEventListener('click', toggleFullScreen);

    // Fullscreen Button
    $('#fullscreen_animated_icon').each(function (index, element) {
        bodymovin.loadAnimation({
            container: element, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'fullscreen_mode_button.json' // the path to the animation json
        });
    });
});