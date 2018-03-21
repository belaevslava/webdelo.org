var Deployment = function () {
    var status = new stateStatus();
    var onComplete;

    this.start = function () {
        var env = new productionEnv();
        setTimeout(function () {
            status.deploying();
            env.bubblesStart();
        }, 1000);


        setTimeout(function () {
            status.configuring();
            $('.configuration-item').each(function (index, members) {
                var that = this;
                setTimeout(function () {
                    $(that).fadeIn();
                    var s = Snap($(that).find('.gear')[0]);
                    var gearItem = new gear(s.select('#gearItem'));
                    gearItem.start();
                    setTimeout(function () {
                        env.increase($(that).data('percent'));
                        if (env.getValue() === 100) {
                            setTimeout(function () {
                                status.ready();
                                if ( $.isFunction(onComplete) ) {
                                    onComplete();
                                }
                            }, 200)
                        }
                    }, 1000);
                }, index*2500);
            });
        }, 2000);
    };

    this.onComplete = function (callback) {
        if (!$.isFunction(callback)) {
            throw 'You should put callback to onComplete()';
        }
        onComplete = callback;

        return this;
    }
};

var stateStatus = function () {
    var text = 'Offline';
    var svg  = Snap('#state-icon');

    var setText = function (value) {
        text = value;
        $('#state-status').text(text);
    };

    this.offline = function () {
        setText('Offline');
        svg.select('#state-circle').attr({'stroke': '#dd7670'}, 200);
        svg.select('#state-waves').attr({'fill': '#dd7670'}, 200);
    };

    this.deploying = function () {
        setText('Deploying');
        svg.select('#state-circle').attr({'stroke': '#b55cdd'}, 200);
        svg.select('#state-waves').attr({'fill': '#b55cdd'}, 200);
    };

    this.configuring = function () {
        setText('Configuring');
        svg.select('#state-circle').attr({'stroke': '#63c3dd'}, 200);
        svg.select('#state-waves').attr({'fill': '#63c3dd'}, 200);
    };

    this.ready = function () {
        setText('Ready');
        svg.select('#state-circle').attr({'stroke': '#6ede59'}, 200);
        svg.select('#state-waves').attr({'fill': '#6ede59'}, 200);
    };
};

var gear = function (element) {
    var processingTiming = 1000;

    this.setTiming = function (value) {
        processingTiming = value;
        return this;
    };

    this.start = function () {
        element.addClass('coloration');
        var animation = element.node.children[0];
        setTimeout(function () {
            if (animation) animation.remove();
            element.removeClass('coloration');
            element.animate({
                'd': "M112.8,32.2c-0.2-1.4-1-3.1-2.6-4.7c-3.2-3.2-2.8-2.8-6.2-6.1c-2.9-3-4-4.8-7.8-4.9c-3.8-0.1-5.8,3.5-8.6,5.9c-2.9,2.9-13.9,13.9-17.3,17.4C68.5,41.6,59.1,51,58,52.2c-3.2,3.3-8.8,8.7-12.8,12.7c-3.1-3-3.3-3.3-7.4-7.4c-1.1-1.2-2.3-2.3-3.4-3.4c-1.7-1.7-1.3-1.3-3.4-3.4c-1-1-1.9-1.9-3-3c-0.9-0.9-1.4-1.3-2.2-2.2c-0.9-0.9-0.9-1-1.8-1.8c-0.7-0.6-0.8-0.7-1.7-1.1c-1.3-0.5-1.4-0.5-2.2-0.5c-1.1,0-0.9-0.1-2.6,0.3c-1.4,0.6-1.5,0.5-4,3c-2.1,2.1-1.1,1.1-3.2,3.3c-1.7,1.7-3.7,3.7-5.1,5.1C4,55,3.5,55.6,3.2,58.1c-0.1,2.7,1,4.3,2.3,5.7c1.8,1.8,2.4,2.4,5.8,5.7c3,3,1.5,1.5,4,4c2.3,2.3,3.3,3.3,4.3,4.2c2.8,2.8,3.1,3.1,5.7,5.8c1.1,1,2.9,2.9,4,4c2.6,2.6,1.7,1.6,4,4c1.5,1.5,0.8,0.8,3.9,4c1.3,1.3,2.7,2.9,4.3,4c0.9,0.5,1.9,1.1,4.1,1c1.9-0.1,3.4-0.9,4.6-2.2c1.6-1.6,7-7,8-8c3.7-3.7,10.8-10.8,13.9-13.9c3.8-3.7,6.8-6.8,8-8c1.1-1.1,1.1-1.1,2.2-2.2c2.7-2.7,1.7-1.7,3.8-3.8c1.2-1.2,2.3-2.3,3.1-3.1c3.1-3.1,3.3-3.3,5.8-5.8c2.4-2.4,1-1,3.1-3.1l4-4c1.4-1.4,4.7-4.7,6-6C110.3,38,113.1,36.5,112.8,32.2z",
            }, 500).attr({'fill':'#6ede59'});
        }, processingTiming);
    }
};

var productionEnv = function () {
    var value    = 0;
    var maxValue = 100;
    var minValue = 0;
    var envView  = function () {
        var svg = Snap('#environment');
        var oldText = '';

        this.increase = function (value) {
            var val = 200 - (240 * value/100);
            svg.select('.water-fill').animate({y: val }, 800);
            svg.select('.curtain2').animate({y: val }, 800);
            return this;
        };

        this.decrease = function (value) {
            var val = 200 - (240 * value/100);
            svg.select('.water-fill').animate({y: val }, 800);
            svg.select('.curtain2').animate({y: val }, 800);
            return this;
        };
        this.setText = function (text) {
            svg.select('#text').animate({'opacity': 1}, 200);
            svg.select('#text-black').animate({'opacity': 1}, 200);

            countUpSVG(svg.select('#percent-mask').node, oldText, text);
            countUpSVG(svg.select('#percent').node, oldText, text);
            oldText = text;

            return this;
        };
    };
    var view     = new envView();

    this.increase = function (val) {
        if ( value + val <= maxValue ) {
            value += val;
            view.increase(value).setText(value);
        }
        return this;
    };

    this.decrease = function (val) {
        if ( value - val >= minValue ) {
            value -= val;
            view.decrease(value).setText(value);
        }
        return this;
    };

    this.bubblesStart = function () {
        var svg = Snap('#environment');
        svg.selectAll('.bubbles').animate({opacity: 1}, 200);
    };

    this.getValue = function () {
        return value;
    }
};

var countUpSVG = function (element, from, to, timing, callback) {
    var options = {
        useEasing: true,
        useGrouping: true,
        separator: '',
        decimal: '',
        prefix: '',
        suffix: ''
    };
    var anim = new CountUp( element.id, from, to, -1, timing , options);
    anim.start();
};