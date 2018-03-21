$(function () {
    var steps = new TechSteps( $('.anim-step') );
    $('#prevTech').hide();
    steps.setSetterTrigger($('.setStep'))
         .setNextTrigger($('#nextTech'))
         .setProgressBarItem($('#technologies__progress-bar .progress-bar'))
         .setPrevTrigger($('#prevTech'))
         .next();
});


var TechSteps = function ( collection ) {
    var that        = this;
    var _collection = collection;
    var _current    = -1;
    var _total      = collection.length;
    var _ease       = _ease;
    var _nextTrigger;
    var _prevTrigger;
    var _setterTrigger;
    var _progressBarItems;

    var animateNext = function (nextElement, prevElement, speed) {
        $('#'+prevElement.attr('id') + '-logos .ln').removeClass('fadeIn');
        TweenMax.to('#'+prevElement.attr('id'), speed, { opacity: 0, display: 'none' });
        TweenMax.to('#'+prevElement.attr('id') + ' h3', speed, { opacity: 0 });
        TweenMax.to('#'+prevElement.attr('id') + ' h3', speed, { top: -320, position: 'relative', ease: _ease });
        TweenMax.to('#'+prevElement.attr('id') + ' .text-muted', speed, { top: -180, position: 'relative', opacity: 0, ease: _ease });
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-1', speed, { top: -700, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-2', speed, { top: -650, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-3', speed, { top: -600, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-4', speed, { top: -550, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-5', speed, { top: -500, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-6', speed, { top: -450, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-7', speed, { top: -400, opacity: 0, ease: _ease});


        setTimeout(function () {
            TweenMax.to('#'+nextElement.attr('id'), speed, { opacity: 1, display: ''});
            TweenMax.fromTo('#'+nextElement.attr('id') + ' h3', speed, { top: 100, opacity: 0, position: 'relative'}, { opacity: 1, top: 0 });
            TweenMax.fromTo('#'+nextElement.attr('id') + ' .text-muted', speed, { top: 200, opacity: 0, position: 'relative'}, { opacity: 1, top: 0 });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-1', speed, { opacity: 0, top: 700}, { top: 0, opacity: 1, ease: _ease, onComplete: function () {
                $('#'+nextElement.attr('id') + '-logos .ln').addClass('fadeIn');
            } });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-2', speed, { top: 650, opacity: 0}, { opacity: 1, top: 0, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-3', speed, { top: 600, opacity: 0}, { opacity: 1, top: 0, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-4', speed, { top: 550, opacity: 0}, { opacity: 1, top: 0, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-5', speed, { top: 500, opacity: 0}, { opacity: 1, top: 0, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-6', speed, { top: 450, opacity: 0}, { opacity: 1, top: 0, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-7', speed, { top: 400, opacity: 0}, { opacity: 1, top: 0, ease: _ease });
        }, speed*1000/2);
    };

    var animatePrev = function (nextElement, prevElement, speed) {
        $('#'+prevElement.attr('id') + '-logos .ln').removeClass('fadeIn');
        TweenMax.fromTo('#'+prevElement.attr('id'), speed, { opacity: 1}, { opacity: 0, display: 'none' });
        TweenMax.to('#'+prevElement.attr('id') + ' h3', speed, { top: 100, opacity: 0, position: 'relative'});
        TweenMax.to('#'+prevElement.attr('id') + ' .text-muted', speed, { top: 200, opacity: 0, position: 'relative', ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-1', speed, { top: 700, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-2', speed, { top: 650, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-3', speed, { top: 600, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-4', speed, { top: 550, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-5', speed, { top: 500, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-6', speed, { top: 450, opacity: 0, ease: _ease});
        TweenMax.to('#'+prevElement.attr('id') + '-logos .l-7', speed, { top: 400, opacity: 0, ease: _ease});


        setTimeout(function () {
            TweenMax.fromTo('#'+nextElement.attr('id'), speed, { opacity: 0 }, { opacity: 1 , display: '' });
            TweenMax.fromTo('#'+nextElement.attr('id') + ' h3', speed, { opacity: 0 }, { opacity: 1 });
            TweenMax.fromTo('#'+nextElement.attr('id') + ' h3', speed, { top: -320, position: 'relative' }, { top:0, position: 'relative' });
            TweenMax.fromTo('#'+nextElement.attr('id') + ' .text-muted', speed, { top: -180, position: 'relative', opacity: 0 }, { top: 0, opacity: 1, position: 'relative' });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-1', speed, { top: -700, opacity: 0}, {top:0, opacity: 1, ease: _ease, onComplete: function () {
                $('#'+nextElement.attr('id') + '-logos .ln').addClass('fadeIn');
            }});
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-2', speed, { top: -650, opacity: 0}, { top: 0, opacity: 1, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-3', speed, { top: -600, opacity: 0}, { top: 0, opacity: 1, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-4', speed, { top: -550, opacity: 0}, { top: 0, opacity: 1, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-5', speed, { top: -500, opacity: 0}, { top: 0, opacity: 1, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-6', speed, { top: -450, opacity: 0}, { top: 0, opacity: 1, ease: _ease });
            TweenMax.fromTo('#'+nextElement.attr('id') + '-logos .l-7', speed, { top: -400, opacity: 0}, { top: 0, opacity: 1, ease: _ease });
        }, speed*1000/2);
    };

    var isLast = function () {
        return _current === _total-1;
    };

    var isFirst = function () {
        return _current === 0;
    };

    var foreachPrev = function (number) {
        var callback = function (i, speed) {
            _current--;
            _prev(_current, speed);
        };
        loop(_current - number, callback, 200, 0.2, 0.7);
    };

    var loop = function (i, callback, timeout, fastSpeed, slowSpeed) {
        setTimeout(function () {
            var ratio = fastSpeed * 1000 / timeout;
            --i;
            if ( i>0 ) {
                callback(i, fastSpeed);
            } else {
                timeout = slowSpeed * 1000 * ratio;
                callback(i, slowSpeed);
            }

            if (i) loop(i, callback, timeout, fastSpeed, slowSpeed);
        }, timeout)
    };

    var foreachNext = function (number) {
        var callback = function (i, speed) {
            _current++;
            _next(_current, speed);
        };
        loop(number - _current, callback, 200, 0.2, 0.7);
    };

    var _next = function (step, speed) {
        if ( !isFirst() ) {
            _prevTrigger.show();
        }
        var nextElement = _collection.eq(step);
        var prevElement = _collection.eq(step-1);
        if ( isLast() ) {
            _nextTrigger.hide();
        }
        if ( _progressBarItems ) {
            _progressBarItems.removeClass('active').eq(step).addClass('active passed');
        }

        animateNext(nextElement, prevElement, speed);
    };

    var _prev = function (step, speed) {
        _nextTrigger.show();
        var prevElement = _collection.eq(step);
        var nextElement = _collection.eq(step+1);
        if ( isFirst() ) {
            _prevTrigger.hide();
        }
        if ( _progressBarItems ) {
            _progressBarItems.removeClass('active').eq(step).addClass('active passed');
        }

        animatePrev(prevElement, nextElement, speed);
    };

    var clicked = false;

    this.next = function () {
        if ( clicked ) {
            return;
        }
        clicked = true;
        setTimeout(function () {
            clicked = false;
        }, 300);

        _current +=1;
        _next(_current, 0.7);
    };

    this.prev = function () {
        if ( clicked ) {
            return;
        }
        clicked = true;
        setTimeout(function () {
            clicked = false;
        }, 300);

        _current -=1;
        _prev(_current, 0.7);
    };

    this.set = function ( number ) {
        if ( _current > number ) {
            foreachPrev(number);
        } else if ( _current < number ) {
            foreachNext(number);
        }
        console.log(number);
    };

    this.setPrevTrigger = function ( element ) {
        _prevTrigger = element;
        _prevTrigger.click(function () {
            that.prev();
        });

        return this;
    };

    this.setNextTrigger = function ( element ) {
        _nextTrigger = element;
        _nextTrigger.click(function () {
            that.next();
        });

        return this;
    };

    this.setProgressBarItem = function ( element ) {
        _progressBarItems = element;
        return this;
    };

    this.setSetterTrigger = function ( element ) {
        _setterTrigger = element;
        _setterTrigger.click(function () {
            if ( typeof $(this).data('number') === 'undefined' ) {
                throw 'You should specify data-number to button '+this;
                return;
            }
            that.set( parseInt($(this).data('number'))-1 );
        });

        return this;
    };
};