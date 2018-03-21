
// var restcontroller = new ScrollMagic.Controller();

// var tl = new TimelineLite,
//     mySplitText = new SplitText("#restful-api-svg #header-2", {type:"words,chars"}),
//     chars = mySplitText.chars; //an array of all the divs that wrap each character
//
// TweenLite.set("#restful-api-svg #header-2", {perspective:400});


function pathPrepare ($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dasharray", lineLength);
    $el.css("stroke-dashoffset", lineLength);
}

var restfullApi = $('#restful-api'),
    restfullApiSvg = restfullApi.find('#restful-api-svg'),
    playButton   = restfullApi.find('#rest-play'),
    pauseButton  = restfullApi.find('#rest-pause'),
    repeatButton = restfullApi.find('#rest-repeat'),
    timer        = restfullApi.find('#rest-timer'),
    lineToBa1$        = restfullApi.find("#line-to-ba-1"),
    lineToBaDown1$    = restfullApi.find("#line-to-ba-down-1"),
    lineToBaUp1$      = restfullApi.find("#line-to-ba-2"),
    lineToWebApp$     = restfullApi.find("#line-to-web-app"),
    lineToMobileApp$  = restfullApi.find("#line-to-mobile-app"),
    lineToDesktopApp$ = restfullApi.find("#line-to-desktop-app"),
    lineSummary$ = restfullApi.find("#summary-line"),
    noop$ = restfullApi.find('#noop'),
    oldLineToBa1$      = lineToBa1$.clone(),
    oldLineToBaDown1$  = lineToBaDown1$.clone();

// prepare SVG
pathPrepare(lineToBa1$);
pathPrepare(lineToWebApp$);
pathPrepare(lineToMobileApp$);
pathPrepare(lineToDesktopApp$);
pathPrepare(lineToBaUp1$);
pathPrepare(lineSummary$);

var straightBackendLineCallback = function () {
    var s    = new Snap('#restful-api-svg');
    var line = s.select('#line-to-ba-1');
    line.animate({
        'd': oldLineToBa1$.attr('d')
    }, 1);
};

var bowBackendLineCallback = function () {
    var s    = new Snap('#restful-api-svg');
    var line = s.select('#line-to-ba-1');
    line.animate({
        'd': oldLineToBaDown1$.attr('d')
    }, 1);
};

var autoPause = function () {
    // restTimelineControl.pause();
};


// define movement of panels
var restTimeline = new TimelineMax({
        onUpdate: function(){
            restfullApi.find('#rest-timer').text( '-' + secondsToMMSS(restTimeline.duration()-restTimeline.time()) );
        },
        onComplete: function () {
            restfullApi.find('#rest-timer').text( secondsToMMSS(restTimeline.duration()) );
        }
    })
    .call(straightBackendLineCallback)
    .to(noop$, 0.5, { fill:'#fff'})
    .to(restfullApi.find('#header-1'), 0.8, { opacity: 1, display: 'block' })
    .to(restfullApi.find('#header-1'), 0.8, { opacity:0, display: 'none' })
    .to(restfullApi.find('.background-universe'), 0.1, {opacity:0, animation: 'none'})
    //stage 2
    .to(restfullApi.find('#header-2'), 0.8, { opacity:1, display: 'block' })
    .to(restfullApiSvg.find('#scheme'), 0.18, { y:280 })
    .to(restfullApiSvg.find('#cloud #cloud-mask'), 0.18, { 'stroke-width':7 })
    .add(TweenMax.to(lineToBa1$, 0.18, {strokeDashoffset: 0, strokeDasharray: lineToBa1$[0].getTotalLength(), ease:Linear.easeNone}))
    .to(restfullApiSvg.find('#ba-container-1'), 0.18, {opacity:1})
    .add([
        TweenMax.to(restfullApi.find('#sub-header-2-1'), 0.8, { opacity:1, display: 'block' }),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.1, onComplete: autoPause })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .add([
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.6})
    ])
    .add(TweenMax.to(lineToWebApp$, 0.18, {strokeDashoffset: 0, strokeDasharray: lineToWebApp$[0].getTotalLength(), ease:Linear.easeNone}))
    .to(restfullApi.find('#sub-header-2-1'), 0.8, { opacity:0, display: 'none' })
    .to(restfullApiSvg.find('#web-app-container'), 0.18, { opacity:1, display: 'block' })
    .add([
        TweenMax.to(restfullApi.find('#sub-header-2-2'), 0.8, { opacity:1, display: 'block' }),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#ba-container-1'), 0.8, { opacity:.1, onComplete: autoPause })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .add([
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#ba-container-1'), 0.8, { opacity:1})

    ])
    .to(noop$, 2, { fill:'#fff'})
    .to(restfullApi.find('#sub-header-2-2'), 0.8, { opacity:0, display: 'none' })
    .to(restfullApi.find('#header-2'), 0.8, { opacity:0, display: 'none' })
    //stage 3
    .to(restfullApi.find('#header-3'), 0.18, { opacity:1, display: 'block' })
    .add([
        TweenMax.to(lineToMobileApp$, 0.8, {strokeDashoffset: 0, strokeDasharray: lineToMobileApp$[0].getTotalLength(), ease:Linear.easeNone}),
        TweenMax.to(restfullApiSvg.find('#mobile-app-container'), 0.8, { x:0 }),
        TweenMax.to(lineToDesktopApp$, 0.8, {strokeDashoffset: 0, strokeDasharray: lineToDesktopApp$[0].getTotalLength(), ease:Linear.easeNone}),
        TweenMax.to(restfullApiSvg.find('#desktop-app-container'), 0.8, { x:0 })
    ])
    .add([
        TweenMax.to(restfullApi.find('#sub-header-3-1'), 0.8, { opacity:1, display: 'block' }),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#web-app-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#ba-container-1'), 0.8, { opacity:.1, onComplete: autoPause })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .add([
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#web-app-container'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#ba-container-1'), 0.8, { opacity:1})
    ])
    .to(restfullApi.find('#sub-header-3-1'), 0.8, { opacity:0, display: 'none' })
    .to(restfullApi.find('#header-3'), 0.8, { opacity:0, display: 'none' })
    .to(restfullApi.find('#header-5'), 0.8, {opacity:1,display: 'block'})
    .add([
        TweenMax.to(restfullApi.find('#sub-header-5-1'), 0.8, {opacity:1,display: 'block'}),
        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#web-app-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#ba-container-1'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#desktop-app-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#mobile-app-container'), 0.8, { opacity:.1}),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, { opacity:.1, onComplete: autoPause })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .add([
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, { opacity:.6}),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#web-app-container'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#ba-container-1'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#desktop-app-container'), 0.8, { opacity:1}),
        TweenMax.to(restfullApiSvg.find('#mobile-app-container'), 0.8, { opacity:1})
    ])

    // Team API description
    .add([
        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, {x: 53, y: 95, scale: 0.78, strokeWidth: 3}),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, {x: 53, y: 160, scale: 0.78, strokeWidth: 3}),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, {x: 53, y: 220, scale: 0.78, strokeWidth: 3}),
        TweenMax.to(restfullApiSvg.find('#mobile-circle-container'), 0.8, {x: -1120, y: 95, scale: 0.5}),
        TweenMax.to(restfullApiSvg.find('#web-app-circle-container'), 0.8, {x: -1125, y: 3, scale: 0.5}),
        TweenMax.to(restfullApiSvg.find('#backend-app-1'), 0.8, {x: 11, y: 54, scale: 0.5}),

        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#desktop-app-container'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#web-app-caption'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#your-mobile-app'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#backend-application-1'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#ba-container-2'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, {opacity: 0})
    ])
    .add([
        TweenMax.to(restfullApiSvg.find('#mobile-team-app'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#web-team-app'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#backend-team-app'), 0.8, { opacity: 1 } ),
        TweenMax.to(restfullApiSvg.find('#API-Approach'), 0.5, { opacity: 1 })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .to(restfullApi.find('#sub-header-5-1'), 0.8, {opacity:0, display: 'none'})
    .add([
        TweenMax.to(restfullApi.find('#sub-header-5-2'), 0.8, {opacity:1, display: 'block'}),
        TweenMax.to(restfullApiSvg.find('#usual-approach-container'), 0.8, { opacity: 1 } ),
        TweenMax.to(restfullApiSvg.find('#mobile-team-app'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#web-team-app'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#backend-team-app'), 0.8, { opacity: .1 } ),
        TweenMax.to(restfullApiSvg.find('#API-Approach'), 0.8, { opacity: .1 }),

        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: .1 }),

        TweenMax.to(restfullApiSvg.find('#mobile-circle-container'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#backend-app-1'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#web-app-circle-container'), 0.8, { opacity: .1, onComplete: autoPause })

    ])
    .to(noop$, 2, { fill:'#fff'})
    .add([
        TweenMax.to(restfullApi.find('#sub-header-5-2'), 0.8, {opacity:0, display: 'none'}),
        TweenMax.to(restfullApiSvg.find('#mobile-team-app'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#web-team-app'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#backend-team-app'), 0.8, { opacity: 1 } ),
        TweenMax.to(restfullApiSvg.find('#API-Approach'), 0.8, { opacity: 1 }),

        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: 1 }),

        TweenMax.to(restfullApiSvg.find('#mobile-circle-container'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#backend-app-1'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#web-app-circle-container'), 0.8, { opacity: 1 })
    ])
    .add([
        TweenMax.to(restfullApi.find('#sub-header-5-3'), 0.8, {opacity:1, display: 'block'}),
        TweenMax.to(restfullApiSvg.find('#usual-approach-container'), 0.8, { opacity: .1 })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .add([
        TweenMax.to(restfullApiSvg.find('#api-backend-dev'), 0.8, { attr: {width: 258} }),
        TweenMax.to(restfullApiSvg.find('#api-mobile-dev'), 0.8, { attr: {width: 240} }),
        TweenMax.to(restfullApiSvg.find('#api-web-dev'), 0.8, { attr: {width: 173} })
    ])
    .add([
        TweenMax.to(restfullApiSvg.find('#web-days'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#mob-days'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#backend-days'), 0.8, {opacity: 1})
    ])
    .to(restfullApiSvg.find('#usual-approach-container'), 0.8, { opacity: 1 })
    .to(noop$, 2, { fill:'#fff'})
    .to(restfullApi.find('#sub-header-5-3'), 0.8, {opacity:0, display: 'none'})
    .add([
        TweenMax.to(restfullApi.find('#sub-header-5-4'), 0.8, {opacity:1, display: 'block'}),

        TweenMax.to(restfullApiSvg.find('#api-timelines'), 0.8, { opacity: .1 }),

        TweenMax.to(restfullApiSvg.find('#mobile-team-app'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#web-team-app'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#backend-team-app'), 0.8, { opacity: .1 } ),
        TweenMax.to(restfullApiSvg.find('#API-Approach'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#mobile-circle-container'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#backend-app-1'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#web-app-circle-container'), 0.8, { opacity: .1 })

    ])
    .to(restfullApiSvg.find('#timeline #backend-dev'), 0.8, {attr:{width: 359}})
    .to(restfullApiSvg.find('#stack-backend-days'), 0.8, {opacity: 1})
    .to(restfullApiSvg.find('#timeline #web-dev'), 0.8, {attr:{width: 173}})
    .to(restfullApiSvg.find('#stack-frontend-days'), 0.8, {opacity: 1})
    .to(restfullApiSvg.find('#timeline #mobile-dev'), 0.8, {attr:{width: 240}})
    .to(restfullApiSvg.find('#stack-days'), 0.8, {opacity: 1})
    .add([
        TweenMax.to(restfullApiSvg.find('#mobile-team-app'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#web-team-app'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#backend-team-app'), 0.8, { opacity: 1 } ),
        TweenMax.to(restfullApiSvg.find('#API-Approach'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#mobile-circle-container'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#backend-app-1'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#web-app-circle-container'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#api-timelines'), 0.8, { opacity: 1 })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .to(restfullApi.find('#sub-header-5-4'), 0.8, { opacity: 0, display: 'none' })
    .add([
        TweenMax.to(restfullApi.find('#sub-header-5-5'), 0.8, { opacity: 1, display: 'block' }),
        TweenMax.to(lineSummary$, 0.8, {strokeDashoffset: 0, strokeDasharray: lineSummary$[0].getTotalLength(), ease:Linear.easeNone}),
        TweenMax.to(restfullApi.find('#summary-days'), 0.8, {opacity:1, display: 'block'}),
        TweenMax.to(restfullApiSvg.find('#summary-days'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApi.find('#summary-usual-days'), 0.8, {opacity:1, display: 'block'})
    ])
    .to(noop$, 0.8, { fill:'#fff'})
    .add([
        TweenMax.to(lineSummary$, 0.8, {opacity: 0}),
        TweenMax.to(restfullApi.find('#summary-days'), 0.8, {opacity:0}),
        TweenMax.to(restfullApiSvg.find('#mobile-team-app'), 0.8, { opacity: 0 }),
        TweenMax.to(restfullApiSvg.find('#web-team-app'), 0.8, { opacity: 0 }),
        TweenMax.to(restfullApiSvg.find('#backend-team-app'), 0.8, { opacity: 0 } ),
        TweenMax.to(restfullApiSvg.find('#API-Approach'), 0.8, { opacity: 0 }),
        TweenMax.to(restfullApiSvg.find('#api-backend-dev'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#api-mobile-dev'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#api-web-dev'), 0.8, {opacity: 0}),
        TweenMax.to(restfullApiSvg.find('#usual-approach-container'), 0.8, { opacity: 0 } ),
        TweenMax.to(restfullApiSvg.find('#backend-days'), 0.8, { opacity: 0 }),
        TweenMax.to(restfullApiSvg.find('#mob-days'), 0.8, { opacity: 0 }),
        TweenMax.to(restfullApiSvg.find('#web-days'), 0.8, { opacity: 0 })
    ])
    .add([
        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.2, {x: 1600, y: -25, scale: 1, strokeWidth: 5}),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, {x: 1200, y: 130, scale: 1, strokeWidth: 5}),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, {x: 65, y: 135, scale: 1, strokeWidth: 5}),
        TweenMax.to(restfullApiSvg.find('#mobile-circle-container'), 0.5, {x: 0, y: 0, scale: 1}),
        TweenMax.to(restfullApiSvg.find('#web-app-circle-container'), 0.5, {x: 0, y: 0, scale: 1}),
        TweenMax.to(restfullApiSvg.find('#backend-app-1'), 0.8, {x: 0, y: 0, scale: 1}),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#desktop-app-container'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#web-app-caption'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#your-mobile-app'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#backend-application-1'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#line-to-ba-1'), 0.8, {opacity: 0.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, {opacity: 0.6}),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, {opacity: 1}),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, {opacity: 1})
    ])
    .to(noop$, 2, { fill:'#fff'})
    .to(restfullApi.find('#sub-header-5-5'), 0.8, {opacity:0, display: 'none'})
    .to(restfullApi.find('#header-5'), 0.8, {opacity:0,display: 'none'})

    //stage 4
    .to(restfullApi.find('#header-4'), 0.8, { opacity:1, display: 'block' })
    .to(restfullApi.find('#sub-header-4-1'), 0.8, { opacity:1, display: 'block' })
    .add([
        TweenMax.to(lineToBa1$, 0.1, {
            onComplete: function () {
                var s    = new Snap('#restful-api-svg');
                var line = s.select('#line-to-ba-1');
                line.animate({
                    'd': oldLineToBaDown1$.attr('d')
                }, 400);
            },
            onReverseComplete: function () {
                var s    = new Snap('#restful-api-svg');
                var line = s.select('#line-to-ba-1');
                line.animate({
                    'd': oldLineToBa1$.attr('d')
                }, 400);
            }
        }),
        TweenMax.to(restfullApiSvg.find('#ba-container-1'), 0.8, { y:225 }),
        TweenMax.to(restfullApiSvg.find('#ba-1'), 0.8, { y:25 })
    ])
    .to(restfullApiSvg.find('#developer-team-3'), 0.8, {y:182, x: 18})
    .add([
        TweenMax.to(lineToBaUp1$, 0.8, {strokeDashoffset: 0, strokeDasharray: lineToBaUp1$[0].getTotalLength(), ease:Linear.easeNone}),
        TweenMax.to(restfullApiSvg.find('#ba-container-2'), 0.5, {opacity:1}),
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#mobile-app-container'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#desktop-app-container'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#web-app-container'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, { opacity: .1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: .1 })
    ])
    .to(noop$, 2, { fill:'#fff'})
    .add([
        TweenMax.to(restfullApiSvg.find('#cloud-container'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#line-to-desktop-app'), 0.8, { opacity: .6 }),
        TweenMax.to(restfullApiSvg.find('#line-to-web-app'), 0.8, { opacity: .6 }),
        TweenMax.to(restfullApiSvg.find('#line-to-mobile-app'), 0.8, { opacity: .6 }),
        TweenMax.to(restfullApiSvg.find('#mobile-app-container'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#desktop-app-container'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#web-app-container'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-1'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-2'), 0.8, { opacity: 1 }),
        TweenMax.to(restfullApiSvg.find('#developer-team-3'), 0.8, { opacity: 1, onComplete: function () {
            pauseButton.hide();
            repeatButton.fadeIn();
        } })
    ]);

restTimeline.stop();
restfullApi.find('#rest-timer').text(secondsToMMSS(restTimeline.duration()));

function secondsToMMSS(totalSeconds) {
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = parseInt(seconds);

    var result  = (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
    return result;
}

var controls = function () {
    var timeline;

    this.setTimeline = function ( line ) {
        timeline = line;
        return this;
    };

    this.play = function () {
        timeline.play();
        playButton.hide();
        pauseButton.fadeIn();
        timer.addClass('active');
        return this;
    };

    this.pause = function () {
        timeline.pause();
        pauseButton.hide();
        playButton.fadeIn();
        timer.removeClass('active');
        return this;
    };

    this.repeat = function () {
        timeline.seek(0).play();
        repeatButton.hide();
        playButton.hide();
        pauseButton.fadeIn();
        timer.addClass('active');
        return this;
    };
};

var restTimelineControl = new controls();

$(function(){
    restTimelineControl.setTimeline(restTimeline);
    playButton.click(restTimelineControl.play);
    pauseButton.click(restTimelineControl.pause);
    repeatButton.click(restTimelineControl.repeat);
});