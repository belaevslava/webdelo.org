/**
 * Created by dmitricercel on 10/30/17.
 */
var preloaderClass = function () {
    var min = 60,
        max = 90,
        currentPercent = 0,
        oldPercent = 0,
        onChangeFunction,
        onCompleteFunction;
    var stepStop = Math.floor(Math.random() * (max - min)) + min;

    this.start = function () {
        currentPercent = stepStop;
        if ($.isFunction(onChangeFunction)) {
            onChangeFunction(currentPercent, oldPercent);
        }
        oldPercent = currentPercent;
        return this;
    };

    this.onComplete = function (func) {
        if ($.isFunction(func)) {
            onCompleteFunction = func;
        }
        return this;
    };

    this.onChange = function (func) {
        if ( $.isFunction(func) ) {
            onChangeFunction = func;
        }
        return this;
    };

    this.complete = function() {
        setTimeout(function () {
            currentPercent = 100;
            if ( $.isFunction(onChangeFunction) ) {
                onChangeFunction(currentPercent, oldPercent);
            }
            oldPercent = currentPercent;
            setTimeout(function () {
                if ( $.isFunction(onCompleteFunction) ) {
                    onCompleteFunction.call(this);
                }
            }, 1000);
        }, 800);
        return this;
    }

};
