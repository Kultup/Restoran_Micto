document.addEventListener('DOMContentLoaded', function() {
    // Навігація
    const hamburgerButton = document.getElementById('hamburger-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const navLinks = document.getElementById('nav-links');
    const body = document.body;

    // Відкриття меню
    hamburgerButton.addEventListener('click', function() {
        navLinks.classList.add('open');
        hamburgerButton.classList.add('open');
        body.classList.add('body-menu-open');
    });

    // Закриття меню
    closeMenuButton.addEventListener('click', function() {
        navLinks.classList.remove('open');
        hamburgerButton.classList.remove('open');
        body.classList.remove('body-menu-open');
    });

    // Закриття меню при кліку на посилання
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburgerButton.classList.remove('open');
            body.classList.remove('body-menu-open');
        });
    });

    // Зміна стилю навігації при прокрутці
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Форма бронювання
    const reservationForm = document.getElementById('reservationForm');
    const formStatus = document.getElementById('form-status');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Тут буде код для відправки форми
            // Для демонстрації просто показуємо повідомлення про успіх
            
            formStatus.textContent = 'Дякуємо за ваше бронювання! Ми зв\'яжемося з вами найближчим часом.';
            formStatus.classList.add('success');
            
            // Очищення форми
            reservationForm.reset();
            
            // Приховуємо повідомлення через 5 секунд
            setTimeout(function() {
                formStatus.textContent = '';
                formStatus.classList.remove('success');
            }, 5000);
        });
    }

    // Форма запиту на подію (на сторінці events.html)
    const eventInquiryForm = document.getElementById('eventInquiryForm');
    const eventFormStatus = document.getElementById('event-form-status');

    if (eventInquiryForm) {
        eventInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Тут буде код для відправки форми запиту (наприклад, через Formspree або інший сервіс)
            // Важливо: Використовуйте ІНШИЙ ID форми Formspree для цієї форми!
            
            // --- Початок Демонстрації --- 
            eventFormStatus.textContent = 'Дякуємо за ваш запит! Наш менеджер зв\'яжеться з вами найближчим часом.';
            eventFormStatus.classList.add('success');
            eventInquiryForm.reset();
            setTimeout(function() {
                eventFormStatus.textContent = '';
                eventFormStatus.classList.remove('success');
            }, 6000);
            // --- Кінець Демонстрації --- 
             
            /* 
            // Приклад відправки через Formspree (замініть URL)
            const formData = new FormData(eventInquiryForm);
            fetch(eventInquiryForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    eventFormStatus.textContent = 'Дякуємо за ваш запит! Наш менеджер зв\'яжеться з вами найближчим часом.';
                    eventFormStatus.classList.add('success');
                    eventInquiryForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            eventFormStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            eventFormStatus.textContent = 'Виникла помилка при відправці запиту.';
                        }
                         eventFormStatus.classList.add('error');
                    })
                }
            }).catch(error => {
                 eventFormStatus.textContent = 'Виникла помилка при відправці запиту.';
                 eventFormStatus.classList.add('error');
            }).finally(() => {
                 setTimeout(() => {
                    eventFormStatus.textContent = '';
                    eventFormStatus.classList.remove('success', 'error');
                }, 6000);
            });
            */
        });
    }

    // Ініціалізація слайдера відгуків (якщо він є на поточній сторінці)
    const testimonialsSliderElement = document.querySelector('.testimonials-slider');
    if (testimonialsSliderElement) {
         const testimonialsSlider = new Swiper(testimonialsSliderElement, {
             slidesPerView: 1,
             spaceBetween: 30,
             loop: true,
             autoplay: {
                 delay: 5000,
                 disableOnInteraction: false,
             },
             pagination: {
                 el: '.swiper-pagination',
                 clickable: true,
             },
             breakpoints: {
                 768: {
                     slidesPerView: 2,
                 },
                 1024: {
                     slidesPerView: 3,
                 }
             }
         });
    }

    // Ініціалізація Lightbox для галереї
    const galleryLinks = document.querySelectorAll('.gallery-link');
    if (galleryLinks.length > 0) {
        galleryLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault(); // Запобігаємо переходу за посиланням
                basicLightbox.create(`
                    <img src="${link.href}" alt="">
                `).show();
            });
        });
    }

    // Функція для перевірки видимості елементів
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Функція для анімації при прокрутці
    function handleScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Обробник прокрутки
    window.addEventListener('scroll', handleScroll);

    // Виклик при завантаженні
    handleScroll(); // Викликаємо для початкової перевірки
});

// Функція initMap видалена 