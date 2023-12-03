
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Кол-во видимых слайдов
    slidesPerView: 1,

    // Кол-во переключаемых слайдов
    slidesPerGroup: 1,
    
    // Отключение сенсерности
    allowTouchMove: false
});

