var commonEvaluation = function () {
    var s = Snap("#common-evaluation");
    var onComplete;

    var stage1 = function() {
        var lampContainer = s.select("#path-1");
        var lamp          = s.select("#Lamp");
        var lampCore      = s.select("#Lamp-core");
        var ideaContainer = s.select("#your-idea-container");
        var ideaCaption   = s.select("#your-idea-caption").attr('fill-opacity', 0);
        var loadingBar    = s.select(".loading-bar");

        var lightOn = function () {
            lamp.attr({
                fill: "#FFCD00"
            });
            lampCore.attr({
                fill: "#FFE671"
            });
        };

        ideaContainer.transform('translate(500,100)');
        ideaCaption.attr('fill-opacity', 0);

        lightOn();

        setTimeout(function () {
            ideaCaption.animate({
                'fill-opacity': 1
            }, 1000);
        }, 600);

        setTimeout(function () {
            ideaContainer.animate({transform: 'translate(180,100)'}, 1000, mina.easein);
        }, 1500);

        setTimeout(function () {
            loadingBar.animate({
                opacity: 1
            }, 500, mina.easeout);
        }, 2600);
    };

    var stage2 = function () {
        var stage = s.select("#stage2");
        stage.animate({
            opacity: 1
        }, 500);
        var hoursDiag = new hoursDiagramm();
        hoursDiag.start();

        setTimeout(function () {
            s.select(".loading-bar2").animate({
                opacity: 1
            }, 500, mina.easeout);
        }, 3000);
    };

    var stage3 = function () {
        var stage = s.select("#stage3");
        stage.animate({
            opacity: 1
        }, 800, mina.easein, function () {
            var speed = new speedRuller();
            speed.start();
        });
        onComplete();
    };

    this.start = function () {
        s.select('#stage2').attr({'opacity': 0});
        s.select('#stage3').attr({'opacity': 0});

        stage1();
        setTimeout(stage2, 3100);
        setTimeout(stage3, 6500);
    };

    this.onComplete = function (callback) {
        if (!$.isFunction(callback)) {
            throw 'You should put callback to onComplete()';
        }
        onComplete = callback;

        return this;
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

var hoursDiagramm = function () {
    var s            = Snap("#common-evaluation");
    var infoHours    = s.select('#stage2');
    var totalHours   = 0;
    var circleLength = 629;
    var hours        = [
        {
            title   : 'mailers',
            element : s.select('#mailers-hours'),
            caption : s.select('#mailers-caption'),
            captionValue : s.select('#mailers-caption-value'),
            label   : s.select('#mailers-label'),
            hours   : 100
        },
        {
            title   : 'js',
            element : s.select('#js-hours'),
            caption : s.select('#js-caption'),
            captionValue : s.select('#js-caption-value'),
            label   : s.select('#js-label'),
            hours   : 300
        },
        {
            title   : 'tpls',
            element : s.select('#tpls-hours'),
            caption : s.select('#tpls-caption'),
            captionValue : s.select('#tpls-caption-value'),
            label   : s.select('#tpls-label'),
            hours   : 250
        },
        {
            title   : 'sms',
            element : s.select('#sms-hours'),
            caption : s.select('#sms-caption'),
            captionValue : s.select('#sms-caption-value'),
            label   : s.select('#sms-label'),
            hours   : 50
        },
        {
            title   : 'modules',
            element : s.select('#modules-hours'),
            caption : s.select('#modules-caption'),
            captionValue : s.select('#modules-caption-value'),
            label   : s.select('#modules-label'),
            hours   : 320
        },
        {
            title   : 'objects',
            element : s.select('#objects-hours'),
            caption : s.select('#objects-caption'),
            captionValue : s.select('#objects-caption-value'),
            label   : s.select('#objects-label'),
            hours   : 520
        }
    ];
    var offset       = 0;

    var countPercents = function () {
        hours.forEach(function (item, key, arr) {
            setTimeout(function () {
                item.strokeLength = circleLength * 16.6666/100;

                item.element.attr({'stroke-dasharray': item.strokeLength+' 629', 'stroke-dashoffset':-offset});

                totalHours += item.hours;
                totalHoursObj.setHours(totalHours);
                countUpSVG(item.captionValue.node, 0, item.hours, 0.5);
                countUpSVG(s.select('#totalHours-hours').node, item.hours, totalHours, 0.5);


                item.caption.animate({'fill-opacity':1}, 300);
                setTimeout(function () {
                    item.label.animate({'fill-opacity':1}, 300);
                }, 100);

                offset += item.strokeLength;
            }, key*500);
        });
    };

    this.start = function () {
        countPercents();
    };

    this.getTotalHours = function () {
        return totalHours;
    };
};


var speedRuller = function () {
    var s = Snap("#common-evaluation");
    var speedHandler = {
        fast   : s.select('#fastSpeed'),
        middle : s.select('#middleSpeed'),
        slow   : s.select('#slowSpeed')
    };
    var speedCaption = {
        fast   : s.select('#fast'),
        middle : s.select('#middle'),
        slow   : s.select('#slow')
    };
    var captionColors = {};
    var handler = s.select('#speedHandler');

    var setSlow   = function(){
        handler.attr({
            'stroke-dashoffset': 310,
            'stroke-dasharray': '78 464'
        }, 300);
        captionColors.slow = speedCaption.slow.node.getAttribute('fill');

        if ( captionColors.fast ) {
            speedCaption.fast.attr({
                fill: captionColors.fast
            });
        }
        if ( captionColors.middle ) {
            speedCaption.middle.attr({
                fill: captionColors.middle
            });
        }

        setTimeout(function () {
            speedCaption.slow.attr({
                fill: '#ffffff'
            });
            summaryBlock.setHours( totalHoursObj.getHours() )
                .setDevelopers(4)
                .setWeeks(
                    (new speedByDeveloper())
                        .setDevelopers(4)
                        .setHours( totalHoursObj.getHours() )
                        .getWeeks()
                );

        }, 350);
    };
    var setMiddle = function(){
        handler.attr({
            'stroke-dashoffset': 233,
            'stroke-dasharray': '79 464'
        }, 300);
        captionColors.middle = speedCaption.middle.node.getAttribute('fill');

        if ( captionColors.fast ) {
            speedCaption.fast.attr({
                fill: captionColors.fast
            });
        }
        if ( captionColors.slow ) {
            speedCaption.slow.attr({
                fill: captionColors.slow
            });
        }

        setTimeout(function () {
            speedCaption.middle.attr({
                fill: '#ffffff'
            });
            summaryBlock.setHours( totalHoursObj.getHours() )
                .setDevelopers(6)
                .setWeeks(
                    (new speedByDeveloper())
                        .setDevelopers(6)
                        .setHours( totalHoursObj.getHours() )
                        .getWeeks()
                );
        }, 350);
    };
    var setFast   = function(){
        handler.attr({
            'stroke-dashoffset': 153,
            'stroke-dasharray': '78 464'
        }, 300);
        captionColors.fast = speedCaption.fast.node.getAttribute('fill');

        if ( captionColors.middle ) {
            speedCaption.middle.attr({
                fill: captionColors.middle
            });
        }
        if ( captionColors.slow ) {
            speedCaption.slow.attr({
                fill: captionColors.slow
            });
        }

        setTimeout(function () {
            speedCaption.fast.attr({
                fill: '#ffffff'
            });

            summaryBlock.setHours( totalHoursObj.getHours() )
                        .setDevelopers(8)
                        .setWeeks(
                            (new speedByDeveloper())
                                .setDevelopers(8)
                                .setHours( totalHoursObj.getHours() )
                                .getWeeks()
                        );
        }, 350);

    };


    this.start = function () {
        speedHandler.fast.click(setFast);
        speedHandler.middle.click(setMiddle);
        speedHandler.slow.click(setSlow);

        setSlow();
    };

};

var speedByDeveloper = function () {
    var hours,
        developers,
        devHoursPerWeek = 25;

    this.setHours = function (totalHours) {
        hours = totalHours;
        return this;
    };

    this.setDevelopers = function (quantity) {
        developers = quantity;
        return this;
    };

    this.getWeeks = function () {
        return parseInt(hours / developers / devHoursPerWeek) ;
    };
};

var summaryBlock = function () {};
summaryBlock.s = Snap("#common-evaluation");
summaryBlock.oldWorkers = 0;
summaryBlock.oldWeeks   = 0;
summaryBlock.oldHours   = 0;

summaryBlock.setHours = function (hours) {
    countUpSVG(summaryBlock.s.select('#hoursCaption').node, summaryBlock.oldHours, hours);
    summaryBlock.oldHours = hours;
    return summaryBlock;
};
summaryBlock.setDevelopers = function (workers) {
    countUpSVG(summaryBlock.s.select('#workersCaption').node, summaryBlock.oldWorkers, workers, 1);
    summaryBlock.oldWorkers = workers;
    return summaryBlock;
};
summaryBlock.setWeeks = function (weeks) {
    countUpSVG(summaryBlock.s.select('#weeksCaption').node, summaryBlock.oldWeeks, weeks, 1);
    summaryBlock.oldWeeks = weeks;
    return summaryBlock;
};

var totalHoursObj = function () {};
totalHoursObj.hours = 0;
totalHoursObj.setHours = function (hours) {
    totalHoursObj.hours = hours;
    return totalHoursObj;
};
totalHoursObj.getHours = function () {
    return totalHoursObj.hours;
};