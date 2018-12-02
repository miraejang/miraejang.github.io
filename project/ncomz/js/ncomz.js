'use strict';
    
$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

$(document).ready(function() {
    // #main #header .visual slide
    function mainVisual(selector) {
        var $selector = $('#header .visual');
        var numSlide = $selector.find('ul.slide li').length;
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var timerId = '';
        var timerSpeed = 5000;
        var isTimerOn = true;
        var onPlaying = false;

        $selector.find('ul.indicator li a').on('click', function() {
            var index = $selector.find('ul.indicator li').index($(this).parent());
            showSlide(index + 1);
        });
        $selector.find('p.control a.prev').on('click', function() {
            showSlide(slidePrev);
        });
        $selector.find('p.control a.next').on('click', function() {
            showSlide(slideNext);
        });

        showSlide(1);


        function showSlide(n) {
            if (slideNow === n || onPlaying === true) return false;
            clearTimeout(timerId);
            if (slideNow === 0) {
                $selector.find('ul.slide li').css({'display': 'none'});
                $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'}).addClass('on');
            } else {
                onPlaying = true;
                $selector.find('ul.slide li:eq(' + (slideNow - 1) + ')').stop(true).animate({'opacity': 0}, 500, function() {
                    onPlaying = false;
                }).removeClass('on');
                $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block', 'opacity': 0}).stop(true).animate({'opacity': 1}, 500).addClass('on');
            }
            $selector.find('ul.indicator li').removeClass('on');
            $selector.find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
            slideNow = n;
            slideNext = (n + 1) > numSlide ? 1 : n + 1;
            slidePrev = (n - 1) < 1 ? numSlide : n - 1;
            if (isTimerOn === true) {
                timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
            }
        } // end of showSlide
    } // end of mainVisual

    // navigation
    function nav() {
        $('#header .topbar a.menu').on('click', function() {
            $(this).toggleClass('on');
            $('#header .nav').toggleClass('on');
            $('#header .nav .menu_box a.close').on('click', function() {
                $('#header .topbar a.menu').removeClass('on');
                $('#header .nav').removeClass('on');
            });
        });        
    }

    //scroll event
    $.fn.setCheckShow = function(options) {
        var settings = $.extend({
            classPrefix: 'scroll'
        }, options);

        this.each(function() {
            var $selector = $(this);
            var scrollTop = 0;
            var offsetTop = 0;
            var windowHeight = 0;
            var elementHeight = 0;
            var startShow = 0;
            var endShow = 0;
            var classPrefix = settings.classPrefix;

            checkShow();
            $(window).on('scroll resize', function() {
                checkShow();
            });

            function checkShow() {
                scrollTop = $(document).scrollTop();
                offsetTop = $selector.offset().top;
                windowHeight = $(window).height();
                elementHeight = $selector.outerHeight();
                startShow = offsetTop - windowHeight;
                endShow = offsetTop + elementHeight;

                if (scrollTop < startShow) {
                    $selector.removeClass(classPrefix + '-up ' + classPrefix + '-show');
                    $selector.addClass(classPrefix + '-down');
                } else if (scrollTop > endShow) {
                    $selector.removeClass(classPrefix + '-down ' + classPrefix + '-show');
                    $selector.addClass(classPrefix + '-up');
                } else {
                    $selector.removeClass(classPrefix + '-down ' + classPrefix + '-up ');
                    $selector.addClass(classPrefix + '-show');
                    //$selector.find('ul li').addClass('animated bounceIn');
                }
            }

        }); // end of each
    }  // end of definition of setCheckShow

nav()
mainVisual();
$('#main .section3 ul').setCheckShow();
$('#main .section1 ul').setCheckShow();
$('#main #header').setCheckShow();
    
});

