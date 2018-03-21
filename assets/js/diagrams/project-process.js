var ProjectProcess = function () {
    var onComplete;

    this.start = function () {
        $('.tetris-final').removeClass('d-none');
        $('.project-process').addClass('run');
        setTimeout(function () {
            var s = Snap('#project-process');

            var okSign = s.select('#okSign');

            var myPathB = okSign.attr({
                id: "squiggle",
                fill: "none",
                strokeWidth: "1",
                stroke: "#ffffff",
                strokeMiterLimit: "10",
                strokeDasharray: "9 9",
                strokeDashOffset: "988.01"
            });

            var lenB = myPathB.getTotalLength();
            myPathB.attr({
                stroke: '#fff',
                strokeWidth: 1,
                fill: 'none',
                // Draw Path
                "stroke-dasharray": lenB + " " + lenB,
                "stroke-dashoffset": lenB
            }).animate({"stroke-dashoffset": 0}, 1200,mina.easeinout, function () {
                myPathB.animate({
                    'fill': '#ffffff'
                }, 300);
            });

            var oval = s.select('#oval');

            var ovalLen = oval.getTotalLength();

            oval.attr({
                stroke: '#fff',
                strokeWidth: 1,
                fill: 'none',
                "stroke-dasharray": ovalLen + " " + ovalLen,
                "stroke-dashoffset": ovalLen * 10
            }).animate({"stroke-dashoffset": 0}, 1200,mina.easeinout, function () {
                oval.animate({
                    'fill': '#ffffff'
                }, 300);
            });
        }, 12500);
        setTimeout(function () {
            $('.step3-complete').css('opacity', 1).typeIt({
                speed: 100,
                lifeLike: true,
                autoStart: true
            });
            onComplete();
        }, 11500);
    };

    this.onComplete = function (callback) {
        if (!$.isFunction(callback)) {
            throw 'You should put callback to onComplete()';
        }
        onComplete = callback;

        return this;
    }
};