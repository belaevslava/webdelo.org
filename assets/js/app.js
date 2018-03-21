$(document).ready(function() {
    $('#main').fullpage({
        //Navigation
        //menu: '',
        lockAnchors: false,
        anchors:[
            'link-to--home',
            'link-to--how-do-we-work--evaluation',
            'link-to--how-do-we-work--projection',
            'link-to--how-do-we-work--start-development',
            'link-to--how-do-we-work--deployment-and-support',
            'link-to--restful-api',
            'link-to--technologies',
            'link-to--who-we-are',
            'link-to--contacts'
        ],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: [],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 0,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: false,
        fadingEffect: false,
        //normalScrollElements: '#how-do-we-work--projection',
        scrollOverflow: false,
        scrollOverflowReset: false,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        //controlArrows: true,
        verticalCentered: false,
        //sectionsColor : ['#ccc', '#fff'],
        //paddingTop: '0',
        //paddingBottom: '0',
        //fixedElements: '#header, .footer',
        responsiveWidth: 768,
        responsiveHeight: 0,
        responsiveSlides: false,
        parallax: false,
        parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

        lazyLoading: true,

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){
            var $this = $(this),
                isDiagramComleted = $this.hasClass('js-diagram-completed'),
                isBgAnimationInitalized = $this.hasClass('js-bg-animation-initialized');

            console.log(isBgAnimationInitalized);

            if (isDiagramComleted) return false;

            var sectionId = $this.attr('id'),
                headerMenu = $('#header-navbar__nav');

            headerMenu.find('a').removeClass('active');
            headerMenu.find('a[href="#link-to--' + sectionId + '"]').addClass('active');

            switch(sectionId) {
                case 'home':
                    break;
                case 'how-do-we-work--evaluation':
                    break;
                case 'how-do-we-work--projection':
                    var tetrisElement = $('#tetris'),
                        projectionDiagramElement = $('#how-do-we-work--projection--diagram'),
                        projectionProcess = new ProjectProcess();

                    tetrisElement.attr('data', tetrisElement.data('invalid'));

                    $this.find('.runProjectingDiagram').one('click', function (e) {
                        e.preventDefault();

                        projectionDiagramElement
                            .removeClass('run')
                            .addClass('run');

                        tetrisElement
                            .removeClass('tetris_invalid')
                            .attr('data', '#')
                            .attr('data', tetrisElement.data('valid'));

                        projectionProcess
                            .onComplete(function () {
                                $this.addClass('js-diagram-completed');
                            })
                            .start();
                    });

                    if (!isBgAnimationInitalized) {
                        projectionBg.init();
                    }
                    break;
                case 'how-do-we-work--start-development':
                    var developmentProcessDiagram = new DevelopmentProcess();

                    developmentProcessDiagram.onComplete(function () {
                        $this.addClass('js-diagram-completed');
                    }).start();
                    break;
                case 'how-do-we-work--deployment-and-support':
                    var deployment = new Deployment();

                    deployment.onComplete(function () {
                        $this.addClass('js-diagram-completed');
                    }).start();


                    if (window.innerWidth > 767) {
                        var deploymentAndSupportBg = new DeploymentAndSupportBg();

                        if (!isBgAnimationInitalized) {
                            deploymentAndSupportBg.init();
                        }
                    }
                    break;
                case 'restful-api':
                    break;
                case 'technologies':
                    break;
                case 'who-we-are':
                    break;
                case 'contacts':
                    break;
            }
        },
        afterRender: function(){},
        afterResize: function(){},
        afterResponsive: function(isResponsive){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
});

$(function() {
    $('.icon--google-drive').each(function (index, element) {
        bodymovin.loadAnimation({
            container: element, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../google-drive.json' // the path to the animation json
        });
    });

    var domains = [
        {
            'element': $('#headquatersEmail'),
            'name': 'a.popov',
            'domain': 'webdelo.org'
        },
        {
            'element': $('#dublinEmail'),
            'name': 'victor.cotov',
            'domain': 'webdelo.org'
        },
        {
            'element': $('#melbourneEmail'),
            'name': 'aziz.mirzabekov',
            'domain': 'stooller.com'
        },
        {
            'element': $('#sunnyEmail'),
            'name': 'info',
            'domain': 'bolgarskiydom.com'
        }
    ];

    $.each(domains, function (index, domain, arr) {
        var email = domain.name+'@'+domain.domain,
            href  = 'mailto:'+email;

        domain.element
              .text(email)
              .attr('href', href);
    });

    $('.contacts-form button').click(function (e) {
        var data = $('.contacts-form').serialize();
        $.post(
            '/send.php',
            data
        ).done(function (response) {
            $('.contacts-form input, .contacts-form textarea').each(function () {
                $(this).val('');
            });
            $('.alert-message-sent').removeClass('d-none');
            setTimeout(function () {
                $('.alert-message-sent').addClass('d-none');
            }, 4000);
        }).fail(function() {
            $('.alert-message-error').removeClass('d-none');
            setTimeout(function () {
                $('.alert-message-error').addClass('d-none');
            }, 4000);
        });
        e.stopPropagation();
        return false;
    });
});