$(document).ready(function() {

  $('#trigger-main-menu').on('mouseenter', function() {
    $(this).find('.main-menu').fadeToggle();
  })
  $('#trigger-main-menu').on('mouseleave', function() {
    $(this).find('.main-menu').fadeToggle();
  })

  //----------------------------------------select--------------------------------------//
  $('.select').each(function() {
    const _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 450; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
      class: 'new-select',
      text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
      class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
      $('<div>', {
          class: 'new-select__item',
          html: $('<span>', {
            text: selectOption.eq(i).text()
          })
        })
        .attr('data-value', selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        selectList.slideDown(duration);

        selectItem.on('click', function() {
          let chooseItem = $(this).data('value');

          $('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text($(this).find('span').text());

          selectList.slideUp(duration);
          selectHead.removeClass('on');
        });

      } else {
        $(this).removeClass('on');
        selectList.slideUp(duration);
      }
    });
  });
  //----------------------------------------select--------------------------------------//
  //----------------------------------------slider--------------------------------------//
  $('.slider-services').slick({
    dots: true,
    arrows: false
  });
  $('.discover__slider').slick({
    slidesToShow: 6,
    slidesToScroll: 2,
    dots: true,
    arrows: false,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 786,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  });
  if ($(window).width() < 640) {
    $('.rating-description__inner').slick({
      dots: true,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1
    })
  }

  $(window).resize(function() {
    if ($(window).width() < 640) {
      $('.rating-description__inner').slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1
      })
    }
  });

  if ($(window).width() < 640) {
    $('.mini-articles__inner').slick({
      dots: false,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1
    })
  }

  $(window).resize(function() {
    if ($(window).width() < 640) {
      $('.mini-articles__inner').slick({
        dots: false,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1
      })
    }
  });

  //----------------------------------------slider--------------------------------------//

  $('.choise__item').on('click', function() {
    $('.choise__item').removeClass('choise__item--active');
    $(this).addClass('choise__item--active');

    if ($(this).text() == 'Пакеты услуг') {
      console.log('Пакеты услуг');
      $('.choise-option__item').hide();
      $('.choise-packet').show();
    }
    if ($(this).text() == 'Услуги') {
      console.log('Услуги');
      $('.choise-option__item').hide();
      $('.choise-service').show();
    }
    if ($(this).text() == 'Отзывы') {
      console.log('Отзывы');
      $('.choise-option__item').hide();
      $('.choise-review').show();
    }
  })

  //----------------------------------------check-box--------------------------------------//
  $('.checkbox-label').on('click', function() {
    $(this).parent().parent().find('.checkbox').prop("checked", false);
    $(this).find('.checkbox').prop('checked', true);

    $('.checkbox-label').removeClass('checkbox-label--active');
    $(this).addClass('checkbox-label--active');
  })
  //----------------------------------------check-box--------------------------------------//
  //----------------------------------------configuration__ball--------------------------------------//
  $('.configuration__ball').on('click', function() {
    $(this).toggleClass('configuration__ball--disable');
    $(this).parent().toggleClass('configuration__trigger--disable');
  })
  //----------------------------------------configuration__ball--------------------------------------//

  //----------------------------------------marks--------------------------------------//
  $('.marks__item').on('click', function() {
    $(this).parent().find('.marks__item').removeClass('marks__item--active');
    $(this).addClass('marks__item--active');
  })

  $('.review__checkbox-label').on('click', function() {
    if ($(this).find('.review__checkbox').is(":checked")) {
      $(this).parent().find('.marks__item').addClass('marks__item--disabled');
    } else {
      $(this).parent().find('.marks__item').removeClass('marks__item--disabled');
    }
  })
  //----------------------------------------marks--------------------------------------//
  //----------------------------------------hint--------------------------------------//
  $('.review__title-info').on('mouseenter', function() {
    $(this).parent().next().show();
  })
  $('.review__title-info').on('mouseleave', function() {
    $(this).parent().next().hide();
  })
  //----------------------------------------hint--------------------------------------//

  //----------------------------------------delete--------------------------------------//
  $('.individual-application__delete').on('click', function() {
    $(this).parent().hide();
  })
  //----------------------------------------delete--------------------------------------//
  //----------------------------------------chois-button--------------------------------------//
  $('.choise-button').on('click', function() {
    $(this).toggleClass('choise-button--active');
    text = $(this).text();
    if (text == 'выбрать') {
      $(this).text('выбрано')
    } else {
      $(this).text('выбрать')
    }
  })
  //----------------------------------------chois-button--------------------------------------//

  //----------------------------------------clean-list--------------------------------------//
  $('#clean-list').on('click', function() {
    $('.choise-button').removeClass('choise-button--active').text('выбрать');
  });
  //----------------------------------------clean-list--------------------------------------//

  //----------------------------------------application--------------------------------------//
  $('.application__button').on('click', function() {
    $(this).closest('.application__section').addClass('application__section--disabled').next().removeClass('application__section--hidden');
  })
  $('.application__change').on('click', function() {
    var section = $(this).closest('.application__section');
    section.removeClass('application__section--disabled');

    list = $('.application');

    while (section.length > 0) {
      console.log('fas;fdm;sdlkfm');
      section.next().removeClass('application__section--disabled').addClass('application__section--hidden');
      section = $(section.next());
    }
  })
  //----------------------------------------application--------------------------------------//


  //----------------------------------------menu-burger --------------------------------------//
  $('.header__burger').on('click', function() {
    $(this).toggleClass('header__burger--main').toggleClass('header__burger--close');
    $('.burger-menu').slideToggle();
  })
  //----------------------------------------menu-burger --------------------------------------//

  //----------------------------------------filter--------------------------------------//
  $('.header__filter').on('click', function() {
    $('.filter').slideToggle()
  })
  //----------------------------------------filter--------------------------------------//


  //----------------------------------------media-query--------------------------------------//

  if ($(window).width() < 640) {
    $('.company__box').appendTo('#company__box-mobile');
  }
  $(window).resize(function() {
    if ($(window).width() < 640) {
      $('.company__box').appendTo('#company__box-mobile');
    } else {
      $('.company__box').appendTo('#company__box');
    }
  });


  //----------------------------------------media-query--------------------------------------//

  //---------------------------------------cabinet-menu-mobile--------------------------------------//
  $('.cabinet__menu-mobile').on('click', function() {

  $('.cabinet__menu-item').slideToggle();
  $('.cabinet__menu-title').closest('.cabinet__menu-item').hide();

  })
  //---------------------------------------cabinet-menu-mobile--------------------------------------//
});