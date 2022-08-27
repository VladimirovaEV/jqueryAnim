const modalBtn = $('.present__btn');
const modalClose = $('.modal-order__close');
const modalOrder = $('.modal-order');
modalBtn.on('click', function() {
    modalOrder.show(500);
});
modalClose.click(function() {
    modalOrder.hide(500);
});
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
$('.modal-order__form').submit(function(e) {
    e.preventDefault();
    // $.post('https://jsonplaceholder.typicode.com/todos', $(this).serialize(), function(data, statuts) {
    //     console.log(data);
    //     console.log(statuts);
    // });
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        type: 'POST',
        data: $(this).serialize(),
        success(data) {
            modalOrderTitle.text('Спасибо, ваша заявка принята, номер заявки ' + data.id)
            $('.modal-order__form').slideUp(300);
        },
        error() {
            modalOrderTitle.text('Что-то пошло не так, попробуте позже');
        }
    })
});

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