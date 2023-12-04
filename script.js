
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



