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
    allowTouchMove: false
});


document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.swiper_container');
    const wrapper = document.querySelector('.swiper_wrapper');
    const slides = document.querySelectorAll('.swiper_slide');

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener('mousedown', (e) => selectSlide(index));
    });

    container.addEventListener('mousedown', dragStart);

    container.addEventListener('mouseup', dragEnd);

    container.addEventListener('mousemove', dragMove);

    function dragStart(e) {
        startPos = e.clientX;
        isDragging = true;
        container.style.cursor = 'grabbing';
    }

    function dragMove(e) {
        if (!isDragging) return;

        const currentPosition = e.clientX;
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;

        setTransform();
    }


    function dragEnd() {
        isDragging = false;
        container.style.cursor = 'grab';
        prevTranslate = currentTranslate;
        checkIndex();
    }

    function setTransform() {
        wrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    function selectSlide(index) {
        currentIndex = index;
        updateIndex();
    }

    function updateIndex() {
        currentTranslate = -currentIndex * (slides[0].offsetWidth + 10);
        setTransform();
    }

    function checkIndex() {
        const lastIndex = slides.length - 1;

        if (currentIndex < 0) {
            currentIndex = lastIndex;
        } else if (currentIndex > lastIndex) {
            currentIndex = 0;
        }

        updateIndex();
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const slider1 = document.querySelector('.category_slider'); // Replace with your first slider class
    const slider2 = document.querySelector('.other_slider'); // Replace with your second slider class
    const prevButton1 = document.querySelector('.prev_button'); // Replace with your first prev button class
    const nextButton1 = document.querySelector('.next_button'); // Replace with your first next button class
    const prevButton2 = document.querySelector('.other_prev_button'); // Replace with your second prev button class
    const nextButton2 = document.querySelector('.other_next_button'); // Replace with your second next button class

    let currentIndex1 = 0;
    let currentIndex2 = 0;

    nextButton1.addEventListener('click', function () {
        currentIndex1++;
        updateSlider(slider1, currentIndex1);
    });

    prevButton1.addEventListener('click', function () {
        currentIndex1--;
        updateSlider(slider1, currentIndex1);
    });

    nextButton2.addEventListener('click', function () {
        currentIndex2++;
        updateSlider(slider2, currentIndex2);
    });

    prevButton2.addEventListener('click', function () {
        currentIndex2--;
        updateSlider(slider2, currentIndex2);
    });

    function updateSlider(slider, currentIndex) {
        const totalSlides = slider.children.length;
        const slideWidth = 25; // каждый слайд занимает 25%
        const translateValue = -currentIndex * slideWidth;

        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(${translateValue}%)`;

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
        }, 500);
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



