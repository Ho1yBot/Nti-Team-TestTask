let footerGrade = "5/5";
document.querySelector(".footer_grade").innerHTML = footerGrade;


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
    // allowTouchMove: false
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.other_slider');
    const prevButton = document.querySelector('.other_prev_button');
    const nextButton = document.querySelector('.other_next_button');

    if (!slider || !prevButton || !nextButton) {
        console.error("Slider or buttons not found");
        return;
    }

    let currentIndex = 0;
    const slidesToShow = window.innerWidth >= 375 ? 4 : 2;

    nextButton.addEventListener('click', function () {
        if (currentIndex < slider.children.length - slidesToShow) {
            currentIndex++;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    function updateSlider() {
        const totalSlides = slider.children.length;
        const slideWidth = 100 / slidesToShow;
        const translateValue = -currentIndex * slideWidth;

        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(${translateValue}%)`;

        setTimeout(() => {
            if (currentIndex >= totalSlides - slidesToShow) {
                currentIndex = 0;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(0)`;
            } else if (currentIndex < 0) {
                currentIndex = totalSlides - slidesToShow;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${slideWidth * (totalSlides - slidesToShow)}%)`;
            }
        }, 500);
    }

    // Обновление слайдера при изменении размера окна
    window.addEventListener('resize', function () {
        slidesToShow = window.innerWidth >= 375 ? 4 : 2;
        updateSlider();
    });
});

// document.addEventListener('DOMContentLoaded', function () {
//     const container = document.querySelector('.swiper_container');
//     const wrapper = document.querySelector('.swiper_wrapper');
//     const slides = document.querySelectorAll('.swiper_slide');

//     let isDragging = false;
//     let startPos = 0;
//     let currentTranslate = 0;
//     let prevTranslate = 0;
//     let currentIndex = 0;

//     slides.forEach((slide, index) => {
//         slide.addEventListener('mousedown', (e) => selectSlide(index));
//     });

//     container.addEventListener('mousedown', dragStart);

//     container.addEventListener('mouseup', dragEnd);

//     container.addEventListener('mousemove', dragMove);

//     function dragStart(e) {
//         startPos = e.clientX;
//         isDragging = true;
//         container.style.cursor = 'grabbing';
//     }

//     function dragMove(e) {
//         if (!isDragging) return;

//         const currentPosition = e.clientX;
//         const diff = currentPosition - startPos;
//         currentTranslate = prevTranslate + diff;

//         setTransform();
//     }


//     function dragEnd() {
//         isDragging = false;
//         container.style.cursor = 'grab';
//         prevTranslate = currentTranslate;
//         checkIndex();
//     }

//     function setTransform() {
//         wrapper.style.transform = `translateX(${currentTranslate}px)`;
//     }

//     function selectSlide(index) {
//         currentIndex = index;
//         updateIndex();
//     }

//     function updateIndex() {
//         currentTranslate = -currentIndex * (slides[0].offsetWidth + 10);
//         setTransform();
//     }

//     function checkIndex() {
//         const lastIndex = slides.length - 1;

//         if (currentIndex < 0) {
//             currentIndex = lastIndex;
//         } else if (currentIndex > lastIndex) {
//             currentIndex = 0;
//         }

//         updateIndex();
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev_button');
    const nextButton = document.querySelector('.next_button');

    let currentIndex = 0;

    nextButton.addEventListener('click', function () {
        currentIndex++;
        updateSlider();
    });

    prevButton.addEventListener('click', function () {
        currentIndex--;
        updateSlider();
    });

    function updateSlider() {
        const totalSlides = slider.children.length;
        const slideWidth = 25; // каждый слайд занимает 25%
        const translateValue = -currentIndex * slideWidth;

        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(${translateValue}%)`;

        // После завершения анимации, проверяем, если мы находимся в конце или начале слайдера
        // и корректируем индекс соответственно
        setTimeout(() => {
            if (currentIndex >= totalSlides - 4) {
                currentIndex = 0;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(0)`;
            } else if (currentIndex < 0) {
                currentIndex = totalSlides - 4;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${slideWidth * (totalSlides - 4)}%)`;
            }
        }, 500); // время анимации
    }
});



function validateForm() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');

    // Сброс стилей ошибок перед каждой проверкой
    nameInput.classList.remove('error');
    nameError.style.display = 'none';
    phoneInput.classList.remove('error');
    phoneError.style.display = 'none';

    // Проверка имени на наличие только букв (латиница и кириллица)
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!nameRegex.test(nameInput.value.replace(/\s/g, ''))) {
        nameInput.classList.add('error');
        nameError.style.display = 'block';
        return;
    }

    // Форматирование номера телефона при вводе
    let formattedPhone = phoneInput.value.replace(/[^\d]/g, '');

    // Проверка, что номер телефона содержит 11 цифр
    if (formattedPhone.length !== 11) {
        phoneInput.classList.add('error');
        phoneError.style.display = 'block';
        return;
    }

    if (formattedPhone.length > 0) {
        formattedPhone = formattedPhone.substring(0, 3) +
            formattedPhone.substring(3, 6) +
            formattedPhone.substring(6, 8) +
            formattedPhone.substring(8, 11);
    }

    phoneInput.value = formattedPhone;

    // Если обе проверки прошли успешно, выводим сообщение об успешной отправке
    openModal();
}

function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {


    // Обработчик нажатия на иконку корзины
    var cartButton = document.querySelector('.user_btn_icon_cart');
    var cart = document.getElementById('cart');

    cartButton.addEventListener('click', function () {
        // Показать или скрыть корзину
        if (cart.style.display === 'none' || cart.style.display === '') {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }
    });

    // Обработчики изменения количества и удаления товаров оставьте без изменений
    var quantityInputs = document.querySelectorAll('.product-quantity input');
    var removeButtons = document.querySelectorAll('.product-removal button');

    quantityInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            updateQuantity(input);
        });
    });

    removeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            removeItem(button);
        });
    });

    /* Set rates + misc */
    var taxRate = 0.05;
    var shippingRate = 15.00;
    var fadeTime = 300;

    /* Recalculate cart */
    function recalculateCart() {
        var subtotal = 0;

        /* Sum up row totals */
        var products = document.querySelectorAll('.product');

        products.forEach(function (product) {
            subtotal += parseFloat(product.querySelector('.product-line-price').textContent);
        });

        /* Calculate totals */
        var tax = subtotal * taxRate;
        var shipping = (subtotal > 0 ? shippingRate : 0);
        var total = subtotal;

        /* Update totals display */
        var totalsValues = document.querySelectorAll('.totals-value');

        totalsValues.forEach(function (totalsValue) {
            totalsValue.style.display = 'none';
        });

        var cartSubtotal = document.getElementById('cart-subtotal');
        var cartTax = document.getElementById('cart-tax');
        var cartShipping = document.getElementById('cart-shipping');
        var cartTotal = document.getElementById('cart-total');
        var checkoutButton = document.querySelector('.checkout');

        setTimeout(function () {
            cartSubtotal.textContent = subtotal.toFixed(2);
            cartTax.textContent = tax.toFixed(2);
            cartShipping.textContent = shipping.toFixed(2);
            cartTotal.textContent = total.toFixed(2);

            // if (total == 0) {
            //     checkoutButton.style.display = 'none';
            // } else {
            //     checkoutButton.style.display = 'block';
            // }

            totalsValues.forEach(function (totalsValue) {
                totalsValue.style.display = 'block';
            });
        }, fadeTime);
    }

    /* Update quantity */
    function updateQuantity(quantityInput) {
        /* Calculate line price */
        const productRow = quantityInput.closest('.product');
        const price = parseFloat(productRow.querySelector('.product-price').textContent);
        const quantity = quantityInput.value;
        const linePrice = price * quantity;

        /* Update line price display and recalc cart totals */
        const productLinePrice = productRow.querySelector('.product-line-price');

        productLinePrice.style.display = 'none';

        setTimeout(function () {
            productLinePrice.textContent = linePrice.toFixed(2);
            recalculateCart();
            productLinePrice.style.display = 'block';
        }, fadeTime);
    }

    /* Remove item from cart */
    function removeItem(removeButton) {
        /* Remove row from DOM and recalc cart total */
        const productRow = removeButton.closest('.product');
        productRow.style.display = 'none';

        setTimeout(function () {
            productRow.remove();
            recalculateCart();
        }, fadeTime);
    }



});

function closeCart() {
    const cart = document.getElementById('cart');
    cart.style.display = 'none';
}


const inputElement = document.getElementById('search-btn');

function updatePlaceholderText() {
    const newPlaceholderText = window.matchMedia('(max-width: 375px)').matches ? 'Поиск' : 'Искать товары';
    inputElement.placeholder = newPlaceholderText;
}

updatePlaceholderText();

window.addEventListener('resize', updatePlaceholderText);


// Бургер меню
document.addEventListener('DOMContentLoaded', function () {
    var menuButton = document.querySelector('.menu_burger_hidden');
    menuButton.addEventListener('click', toggleMenu);
});

document.addEventListener('DOMContentLoaded', function () {
    var menuButton = document.querySelector('.menu_burger_hidden');
    menuButton.addEventListener('click', toggleMenu);
});

function toggleMenu() {
    var menu = document.querySelector('.menu');
    var overlay = document.querySelector('.overlay');

    menu.style.left = menu.style.left === '0px' ? '0px' : '0';
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

function closeMenu() {
    var menu = document.querySelector('.menu');
    var overlay = document.querySelector('.overlay');

    menu.style.left = '-295px';
    overlay.style.display = 'none';
}



