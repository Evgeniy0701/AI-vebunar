$(document).ready(function() {
	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_term = getUrlParameter('utm_term');
	var utm_campaign = getUrlParameter('utm_campaign');
	var utm_content = getUrlParameter('utm_content');
	$('input[name=utm_source]').val(utm_source);
	$('input[name=utm_medium]').val(utm_medium);
	$('input[name=utm_term]').val(utm_term);
	$('input[name=utm_campaign]').val(utm_campaign);
	$('input[name=utm_content]').val(utm_content);

	// AOS.init();
});


$(window).load(function() {
	$("input[name=name]").val(getCookie("name"));
	$("input[name=email]").val(getCookie("email"));
	$("input[name=phone]").val(getCookie("phone"));
});



var lazyLoadInstance = new LazyLoad({
	// Your custom settings go here
});



$.get("https://ipapi.co/json/", function(obj) {
	if(getCookie("phone")){
		$('input[name=phone]').val(getCookie("phone"));
	}
	else {
        $('input.phone').val('+38');
	}
	$("input[name=phone]").intlTelInput({
		// utilsScript       : '/js/utils.js',
		defaultCountry    : 'auto',
		separateDialCode  : false,
		nationalMode      : false,
		initialCountry    : 'ua',
		preferredCountries: ['ua', 'kz']
	});
});



$('form [type=sumbit]').on('click', function(e){
	e.preventDefault();
	var form = $(this).closest('form');
	form.addClass('loading');
	setTimeout(function(){
		form.submit();
	}, 1000)
});

function validate(formid) {
	var output = false;
	form = $(formid);
	form.addClass('loading');
	form.find('input[name=name]').focus();
	form.find('input[name=email]').focus();
	form.find('input[name=phone]').focus();
	form.find('button[type="submit"]').focus();
	const formdata = {
		name: form.find('input[name=name]').val(),
		email: form.find('input[name=email]').val(),
		phone: form.find('input[name=phone]').val().replace(/\s/g, ''),
		utm_source: form.find('input[name=utm_source]').val(),
		utm_medium: form.find('input[name=utm_medium]').val(),
		utm_term: form.find('input[name=utm_term]').val(),
		utm_campaign: form.find('input[name=utm_campaign]').val(),
		utm_content: form.find('input[name=utm_content]').val(),
	}
	if($('.error').length > 0) {
		form.find('input.error').first().focus();
		form.removeClass('loading');
	}
	else {
		$.ajax({
			type: "POST",
			url: 'mailer/export.php',
			async: false,
			data: formdata,
			success: function(res){
				setCookie('name', formdata.name, 365);
				setCookie('email', formdata.email, 365);
				setCookie('phone', formdata.phone, 365);
				window.location.href = form.find('input[name=success_url]').val();
			}
		});
	}
	return output;
};


// SMOOTH SCROLL //

$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.not('[href*="modal"]')
	.click(function(event) {
		// On-page links
		$('.header').removeClass('active');
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				// var headerHeight = $('.header').height();
				var headerHeight =0;
				if($(window).width() < 760){
					headerHeight = 0;
				}
				$('html, body').animate({
					scrollTop: target.offset().top - headerHeight
				},
				{
					// Set the duration long enough to allow time
					// to lazy load the elements.
					duration: 1500,
					// At each animation step, check whether the target has moved.
					step: function( now, fx ) {
					// Where is the target now located on the page?
					// i.e. its location will change as images etc. are lazy loaded
					var newOffset = target.offset().top - headerHeight;
					// If where we were originally planning to scroll to is not
					// the same as the new offset (newOffset) then change where
					// the animation is scrolling to (fx.end).
					if(fx.end !== newOffset)
						fx.end = newOffset;
					}
				})
			}
		}
});


if (Boolean(getCookie("name"))) {
    $("input[name=name]").parent('.input__wrap').addClass('focused');
}

if (Boolean(getCookie("email"))) {
    $("input[name=email]").parent('.input__wrap').addClass('focused');
}

if (Boolean(getCookie("phone"))) {
    $("input[name=phone]").parent('.input__wrap').addClass('focused');
}

$('.input__wrap').on('focusin', function () {
	$(this).addClass('focused');
});


$('.logos__items').on('init', function (event, slick) {
    lazyLoadInstance.update();
});


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.wrapper').style.paddingTop = document.querySelector('header').offsetHeight + 'px';

    if (window.innerWidth < 1260) {
        $('.header__burger').click(function() {
            $('.header__burger').toggleClass('_active');
            $('body').toggleClass('_lock');
            $('.header__menu').toggleClass('_active');
            $('.header').toggleClass('active');
        });

        $('.header__menu li').click(function () {
            $('.header__burger').toggleClass('_active');
            $('body').toggleClass('_lock');
            $('.header__menu').toggleClass('_active');
        })
    }

    // Добавление слоя шума к каждоый секции и футеру.
    let targets = document.querySelectorAll('.noise');
    for (let target of targets) {
        let canvas = document.createElement('canvas');
        if (!target.offsetWidth || !target.offsetHeight) continue;
            canvas.width = target.offsetWidth;
            canvas.height = target.offsetHeight;
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imageData.data;
        for (var i = 0, il = pixels.length; i < il; i += 4) {
            var color = Math.round(Math.random() * 255);
            pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
            pixels[i + 3] = 20;
        }
        ctx.putImageData(imageData, 0, 0);
        target.appendChild(canvas);
    };

    if (window.innerWidth < 1260) {
        const forSlider = new Swiper('.for-slider__body', {
            speed: 800,
            spaceBetween: 20,
            centeredSlides: false,
            autoHeight: false,
            slidesPerView: 1,
            pagination: {
                el: ".for-slider__pagination",
                dynamicBullets: false,
            },
            on: {
                init: function () {
                    lazyLoadInstance.update();
                },
            },
            breakpoints: {
                760: {
                    slidesPerView: 2,
                }
            },
        });

        const speakerSlider = new Swiper('.speakers-slider__body', {
            speed: 300,
            spaceBetween: 8,
            slidesPerView: 1.4,
            // pagination: {
            //     el: ".speakers-slider__pagination",
            //     clickable: true,
            // },
            on: {
                init: function () {
                    lazyLoadInstance.update();
                },
            },
            breakpoints: {
                760: {
                    slidesPerView: 2.4,
                    allowTouchMove: true,
                },
                1260: {
                    slidesPerView: 3,
                },
            },
        });
    }


    // Modules
    $('.module__header').on('click', function () {
        var targetSelector = $(this).closest('.module').attr('id');
        var $target = $('#' + targetSelector);
        var programSection = $('.program');

        if ($(this).closest('.module').hasClass('active')) {
            $(this).closest('.module').addClass('active');

            if ($(window).width() > 1260) {
                programSection.css('minHeight', 'auto');
            }
        } else {
            $('.module').removeClass('active');
            $(this).closest('.module').addClass('active');

            if ($(window).width() > 1260) {
                var newHeightSection =
                    $($target).find('.module__body-wrap').height() + 360;
                    programSection.css('minHeight', newHeightSection + 'px');
            } else if ($(window).width() < 1260) {
                $('html, body').animate(
                    {
                        scrollTop: $target.offset().top,
                    },
                    {
                        duration: 1000,
                        step: function (now, fx) {
                            var newOffset = $target.offset().top;
                            if (fx.end !== newOffset) fx.end = newOffset;
                        },
                    }
                );
            }
        }
    });
    // END Modules

    // Methodology
    const desktopSlider = new Swiper('.desktop-slider__body', {
        spaceBetween: 20,
        centeredSlides: true,
        slidesPerView: 1,
        pagination: {
            el: ".desktop-slider__pagination",
            type: 'fraction',
            formatFractionCurrent: function(number) {
                return number;
            },
            formatFractionTotal: function(number) {
                return number;
            }
        },
        navigation: {
            nextEl: ".desktop-slider__btn_next",
            prevEl: ".desktop-slider__btn_prev",
        },
        on: {
            init: function () {
                lazyLoadInstance.update();
            },
        },
    });


    let methodologyBtns = document.querySelectorAll('.methodology__item');
    if (methodologyBtns.length > 0) {
        for (let i = 0; i < methodologyBtns.length; i++) {
            methodologyBtns[i].addEventListener('click', () => {
                clearActiveClass();
                methodologyBtns[i].classList.add('active');
                desktopSlider.slideTo(i)
            })
        };

        function clearActiveClass() {
            for (let i = 0; i < methodologyBtns.length; i++) {
                methodologyBtns[i].classList.remove('active')
            };
        }

        desktopSlider.on('slideChange', function () {
            clearActiveClass();
            methodologyBtns[desktopSlider.activeIndex].classList.add('active');

        });
    }
    // END Methodology

    const profitSlider = new Swiper('.profit__slider', {
        speed: 300,
        spaceBetween: 20,
        loop: true,
        slidesPerView: 1,
        // centeredSlides: true,
        pagination: {
            el: ".profit__slider-pagination",
        },
        navigation: {
            nextEl: ".profit__slider-btn_next",
            prevEl: ".profit__slider-btn_prev",
        },
        on: {
            init: function () {
                lazyLoadInstance.update();
            },
        },
        breakpoints: {
            760: {
                slidesPerView: 1.5,
            },
            1260: {
                slidesPerView: 2.5,
            },
        },
    });

    const reviewsSlider = new Swiper('.rewiews-slider__body', {
        speed: 300,
        spaceBetween: 8,
        loop: false,
        slidesPerView: 1.6,
        centeredSlides: false,
        pagination: {
            el: ".rewiews-slider__pagination",
        },
        navigation: {
            nextEl: ".rewiews-slider__btn_next",
            prevEl: ".rewiews-slider__btn_prev",
        },
        on: {
            init: function () {
                lazyLoadInstance.update();
            },
        },
        breakpoints: {
            760: {
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 15,
                loop: true,
            },
            1260: {
                slidesPerView: 5,
                centeredSlides: true,
                spaceBetween: 15,
                loop: true,
            },
        },
    });

    $('.item__question').on('click', function () {
        $(this).closest('.item').toggleClass('active');
    });


    $('.logos__items').slick({
        variableWidth: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 8000,
        cssEase: 'linear',
        pauseOnHover: true,
        swipeToSlide: true,
    });
})








// const slider = new Swiper('.slider', {
// 	speed: 8000,
// 	spaceBetween: 20,
// 	loop: true,
// 	freeMode: true,
// 	centeredSlides: true,
// 	slidesPerView: 2,
// 	freeModeMomentum: false,
// 	pagination: {
// 		el: ".swiper-pagination",
// 		dynamicBullets: true,
// 	},
// 	navigation: {
// 		nextEl: ".swiper-button-next",
// 		prevEl: ".swiper-button-prev",
// 	},
// 	autoplay: {
// 		delay: 0,
// 		disableOnInteraction: false
// 	},
// 	on: {
// 		init: function () {
// 			lazyLoadInstance.update();
// 		},
// 	},
// 	breakpoints: {
// 		760: {
// 			slidesPerView: 4,
// 		},
// 		1260: {
// 			slidesPerView: 5,
// 		},
// 	},
// });

// +3 DAY FOR SECTION RASS
var tomorrow = new Date();
var month = [
	'січня',
	'лютого',
	'березня',
	'квітня',
	'травня',
	'червня',
	'липня',
	'серпня',
	'вересня',
	'жовтня',
	'листопада',
	'грудня',
];
tomorrow.setDate(tomorrow.getDate() + 3);
$('.rass__date_day').html(tomorrow.getDate());
$('.rass__date_month').html(month[tomorrow.getMonth()]);