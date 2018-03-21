var DeploymentAndSupportBg = function() {
    this.init = function() {
        window.particlesJS('how-do-we-work--deployment-and-support', {
            "particles": {
                "number": {
                    "value": 16,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.12,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 0.12,
                        "opacity_min": 0,
                        "sync": false
                    }
                },
                "size": {
                    "value": 120,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 12,
                        "size_min": 0,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 240,
                        "size": 120,
                        "duration": 2.4,
                        "opacity": 0.12,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

        setTimeout(function() {
            $('#how-do-we-work--deployment-and-support').addClass('js-bg-animation-initialized');
        }, 1);
    };

    this.destroy = function() {
        $('#how-do-we-work--deployment-and-support .particles-js-canvas-el').remove();
    }
};