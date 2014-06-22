(function ($) {
	$(document).ready(function () {

		$(window).load(function () {
			var preloaderDelay = 350,
				preloaderFadeOutTime = 800;

			function hidePreloader() {
				var loadingAnimation = $('#loading-animation'),
					preloader = $('#preloader');
				loadingAnimation.fadeOut();
				preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
			}
			hidePreloader();
		});

		if ($(window).width() < 768) {
			$('.animated').removeClass('animated').removeClass('hiding');
			$('.stat span').removeClass('timer');
		}
		
		$(window).scroll(function () {
			var scroll = $(this).scrollTop();
			var header = $('#top-header');
			var logo = $('#logo-header');
			var src = logo.attr('src');
			var buyButton = $('#buy-tickets-button');

			if (scroll >= 100) {
				header.addClass('after-scroll');
				logo.removeClass('logo-light').addClass('logo-dark');
			} else {
				header.removeClass('after-scroll');
				logo.removeClass('logo-dark').addClass('logo-light');
			}

			if (scroll >= $(window).height()) {
				buyButton.fadeIn(400);
				buyButton.removeClass('hidden');
			} else {
				buyButton.fadeOut(400, function () {
					buyButton.addClass('hidden');
				});
			}
		});

		$('.animated').appear(function () {
			var element = $(this);
			var animation = element.data('animation');
			var animationDelay = element.data('delay');
			if (animationDelay) {
				setTimeout(function () {
					element.addClass(animation + " visible");
					element.removeClass('hiding');
					if (element.hasClass('counter')) {
						element.find('.timer').countTo();
					}
				}, animationDelay);
			} else {
				element.addClass(animation + " visible");
				element.removeClass('hiding');
				if (element.hasClass('counter')) {
					element.find('.timer').countTo();
				}
			}
		}, {
			accY: -150
		});

		$(function () {
			$('a[href*=#]:not([href=#])').click(function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html,body').animate({
							scrollTop: target.offset().top
						}, 1000);
						return false;
					}
				}
			});
		});

		//Side menu
		var container = $('.st-container');
		$('#menu-trigger').click(function (event) {
			event.stopPropagation();
			var effect = $(this).attr('data-effect');
			if (!container.hasClass('st-menu-open')) {
				container.addClass(effect).delay(25).addClass('st-menu-open');
			} else {
				container.removeClass('st-menu-open');
			}
		});
		$('.st-pusher').click(function () {
			if (container.hasClass('st-menu-open')) {
				container.removeClass('st-menu-open');
			}
		});
		$(window).resize(function () {
			if ($(window).width() > 767) {
				container.removeClass('st-menu-open');
			}
		});
	});

	//Google plus
	(function () {
		var po = document.createElement('script');
		po.type = 'text/javascript';
		po.async = true;
		po.src = 'https://apis.google.com/js/platform.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(po, s);
	})();

	//Google maps
	var map;
	var MY_MAPTYPE_ID = 'custom_style';

	function initialize() {
		var featureOpts = [
			{
				stylers: [
					{
						saturation: -20
     },
					{
						lightness: 30
     },
					{
						visibility: 'simplified'
     },
					{
						gamma: 0.8
     },
					{
						weight: 0.8
     }
    ]
   },
			{
				elementType: 'labels',
				stylers: [
					{
						visibility: 'on'
     }
    ]
   },
			{
				featureType: 'water',
				stylers: [
					{
						color: '#dee8ff'
     }
    ]
   }
  ];

		var mapOptions = {
			zoom: 17,
			scrollwheel: false,
			panControl: false,
			zoomControl: false,
			scaleControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			center: centerMap,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
			},
			mapTypeId: MY_MAPTYPE_ID
		};
		if ($(window).width() < 768) {
			mapOptions.center = mobileCenterMap;
		}

		map = new google.maps.Map(document.getElementById('canvas-map'), mapOptions);
		var marker = new google.maps.Marker({
			position: eventPlace,
			map: map
		});
		var styledMapOptions = {
			name: 'Custom Style'
		};

		var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
		map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
	}

	google.maps.event.addDomListener(window, 'load', initialize);

})(jQuery);