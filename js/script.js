const modalBtn = $('.present__btn');
const modalClose = $('.modal-order__close');
const modalOrder = $('.modal-order');
modalBtn.on('click', function() {
    modalOrder.show(500);
});
modalClose.click(function() {
    modalOrder.hide(500);
});
const modalTitle = document.querySelector('.modal-order__title');
const modalOrderFieldset = document.querySelector('.modal-order__fieldset');
const modalOrderInput = $('.modal-order__input');
const modalOrderTitle = $('.modal-order__title');
modalOrderInput.focus(function() {
    modalOrderTitle
    .text(`Введите ${$(this).attr('placeholder').toLowerCase()}`)
});
modalOrderInput.blur(function() {
    modalOrderTitle
    .text('Заполните форму');
})
//     $('.modal-order__form').submit(function(e) {
//     e.preventDefault();
//     // $.post('https://jsonplaceholder.typicode.com/todos', $(this).serialize(), function(data, statuts) {
//     //     console.log(data);
//     //     console.log(statuts);
//     // });
//     $.ajax({
//         url: 'https://jsonplaceholder.typicode.com/todos',
//         type: 'POST',
//         data: $(this).serialize(),
//         success(data) {
//             modalOrderTitle.text('Спасибо, ваша заявка принята, номер заявки ' + data.id)
//             $('.modal-order__form').slideUp(300);
//         },
//         error() {
//             modalOrderTitle.text('Что-то пошло не так, попробуте позже');
//         }
//     })
// });
$('.header__burger').on('click', function() {
    $('.navigation').animate({
        left: 0,
    }, 500, function() {
        $('.navigation__close').animate({
            opacity: 1,
        }, 300, 'swing');
    });
})
$('.navigation__close').on('click', function() {
    $('.navigation').animate({
        left: '-400px'
    })
})
$(document).on('click', function(e) {
    if (!$('.navigation').is(e.target) && $('.navigation').has(e.target).length === 0 && !$('.header__burger').is(e.target)) {
        $('.navigation').animate({
        left: '-400px'
    })
    }
})
const cityOpen = document.querySelector('.js-city-open');
const city = document.querySelector('.city');

cityOpen.addEventListener('click', () => {
  city.classList.add('city_open')
});

city.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target.closest('.city__choice');
  if (target) {
    cityOpen.textContent = target.textContent;
    city.classList.remove('city_open');
  }
});
$('.header__sign, .header__sign2').click(() => {
  $('.alert').attr("role", "alert");

  $('.alert').addClass('visible');
  setTimeout(() => {
    $('.alert').removeClass('visible');

    $('.alert').removeAttr("role", "alert");

  }, 3000)
})
const characteristicsListElem = document.querySelector('.characteristics__list');
const characteristicsItemElems = document.querySelectorAll('.characteristics__item');

characteristicsItemElems.forEach(elem => {
  if (elem.children[1].classList.contains('active')) {
    elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
  }
})

const open = (button, dropDown) => {
  closeAllDrops(button, dropDown);
  button.ariaExpanded = true;

  dropDown.style.height = `${dropDown.scrollHeight}px`;
  button.classList.add('active');
  dropDown.classList.add('active');
};

const close = (button, dropDown) => {
  button.ariaExpanded = false;
  button.classList.remove('active');
  dropDown.classList.remove('active');
  dropDown.style.height = '';
};

const closeAllDrops = (button, dropDown) => {
  characteristicsItemElems.forEach((elem) => {
    if (elem.children[0] !== button && elem.children[1] !== dropDown) {

      close(elem.children[0], elem.children[1]);
    }
  })
}

characteristicsListElem.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('characteristics__title')) {
    const parent = target.closest('.characteristics__item');
    const description = parent.querySelector('.characteristics__description');
    if (description.classList.contains('active')) {
      close(target, description);
    } else {
      open(target, description);
    }
  }
});
const cookieAlert = document.querySelector('.alert-cookie');
const cookieButton = document.querySelector('.alert-cookie__button');

cookieButton.addEventListener('click', () => {
    cookieAlert.classList.remove('alert-cookie_no-ready');
    Cookies.set('dom-ready-cookie', 'true', {
        expires: 10,
    })
});
if (!Cookies.get('dom-ready-cookie')) {
    cookieAlert.classList.add('alert-cookie_no-ready');
};
const inputTel = document.querySelector('.modal-order__input_tel');
const telMask = new Inputmask('+7 (999)-999-99-99');

telMask.mask(inputTel);

const justValidate = new JustValidate('.modal-order__form');
justValidate
    .addField('.modal-order__input', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваше имя',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Не короче 3 символов',
        },
        {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Слишком длинное имя',
        },
    ])
    .addField('.modal-order__input_email', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваш email'
        },
        {
            rule: 'email',
            errorMessage: 'email некорректный'
        }
    ])
    .addField('.modal-order__input_tel', [
        {
            rule: 'required',
            errorMessage: 'Укажите ваш телефон'
        },
        {
            validator(value) {
                const phone = inputTel.inputmask.unmaskedvalue();
                return !!(Number(phone) && phone.length === 10);
            },
            errorMessage: 'Телефон не корректный'
        }
    ])
.onSuccess(event => {
    const target = event.target;
    axios.post('https://jsonplaceholder.typicode.com/posts', {
        name: target.name.value,
        tel: inputTel.inputmask.unmaskedvalue(),
        email: target.email.value,
    })
    .then(response => {
        target.reset();
        modalOrderFieldset.disabled = true;
        modalTitle.textContent = `Спасибо, ваша заявка принята, номер заявки ${response.data.id}!`;
    })
    .catch(error => {
        console.error(error);
        target.reset();
        modalOrderFieldset.disabled = false;
        modalTitle.textContent = `Что-то пошло не так, попробуйте позже!`;
    })
});
new Swiper('.swiper', {
  slidesPerView: 3,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  mousewheel: true,
  keyboard: true,
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//       spaceBetween: 5
//     },
//     480: {
//       slidesPerView: 2,
//       spaceBetween: 10
//     },
//     640: {
//       slidesPerView: 3,
//       spaceBetween: 20
//     }
//   }
  navigation: {
    nextEl: '.slider__button-right',
    prevEl: '.slider__button-left',
  },
});

$('.acc__list').accordion({
    active: true,
    collapsible: true,
    heightStyle: 'content',
    icons: {
        header: 'acc__accord',
        activeHeader: 'acc__accord acc__accord-active'
    }
});