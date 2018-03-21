var DevelopmentProcess = function () {
    var timeline = new TimelineMax(),
        duration = 100,
        step1Line = $('#step-1-line'),
        step2Line = $('#step-2-line'),
        step3Line = $('#step-3-line'),
        step4Line = $('#step-4-line'),
        step5Line = $('#step-5-line'),
        step1LineLength = 103.9,
        step2LineLength = 165.9,
        step3LineLength = 103.9,
        step4LineLength = 125.9,
        step5LineLength = 117.9,
        step1Width = 184.8,
        step2Width = 323.4,
        step3Width = 196.8,
        step4Width = 342.7,
        step5Width = 184.8;

    pathPrepare(step1Line, step1LineLength);
    pathPrepare(step2Line, step2LineLength);
    pathPrepare(step3Line, step3LineLength);
    pathPrepare(step4Line, step4LineLength);
    pathPrepare(step5Line, step5LineLength);

    var onComplete;

    this.start = function () {

        timeline
                .to('#step-1-timeline', duration/step1Width, { attr: {width: step1Width} })
                .to('#step-1-timeline-caption', duration/step1Width, {opacity: 1})
                .add(TweenMax.to(step1Line, duration/step1Width, {strokeDashoffset: 0, strokeDasharray: step1LineLength, ease:Linear.easeNone}))
                .to('#step-1-caption', duration/step1Width, {opacity: 1})

                .to('#step-2-timeline', duration/step2Width, { attr: {width: step2Width} })
                .to('#step-2-timeline-caption', duration/step2Width, {opacity: 1})
                .add(TweenMax.to(step2Line, duration/step2Width, {strokeDashoffset: 0, strokeDasharray: step2LineLength, ease:Linear.easeNone}))
                .to('#step-2-caption', duration/step2Width, {opacity: 1})

                .to('#step-3-timeline', duration/step3Width, { attr: {width: step3Width} })
                .to('#step-3-timeline-caption', duration/step3Width, {opacity: 1})
                .add(TweenMax.to(step3Line, duration/step3Width, {strokeDashoffset: 0, strokeDasharray: step3LineLength, ease:Linear.easeNone}))
                .to('#step-3-caption', duration/step3Width, {opacity: 1})

                .to('#step-4-timeline', duration/step4Width, { attr: {width: step4Width} })
                .to('#step-4-timeline-caption', duration/step4Width, {opacity: 1})
                .add(TweenMax.to(step4Line, duration/step4Width, {strokeDashoffset: 0, strokeDasharray: step4LineLength, ease:Linear.easeNone}))
                .to('#step-4-caption', duration/step4Width, {opacity: 1})

                .to('#step-5-timeline', duration/step5Width, { attr: {width: step5Width} })
                .to('#step-5-timeline-caption', duration/step5Width, {opacity: 1})
                .add(
                    TweenMax.to(step5Line, duration/step5Width, {
                        strokeDashoffset: 0,
                        strokeDasharray: step5LineLength,
                        ease:Linear.easeNone, onComplete: function () {
                            if ( $.isFunction(onComplete) ) {
                                onComplete();
                            }
                        }
                    }
                ));
    };

    function pathPrepare ($el, lineLength) {
        $el.css("stroke-dasharray", lineLength);
        $el.css("stroke-dashoffset", lineLength);
    }

    this.setDuration = function (value) {
        duration = value*10;
        return this;
    };

    this.onComplete = function (callback) {
        if (!$.isFunction(callback)) {
            throw 'You should put callback to onComplete()';
        }
        onComplete = callback;

        return this;
    };
};