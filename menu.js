document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const modal = document.getElementById('menuItemModal');
    const modalImage = modal.querySelector('img');
    const modalTitle = modal.querySelector('h3');
    const modalDescription = modal.querySelector('.modal-description');
    const closeModal = modal.querySelector('.close-modal');
    
    // Search and filter functionality
    const searchInput = document.getElementById('menuSearch');
    const filterButtons = document.querySelectorAll('.filter-button');
    const menuCategories = document.querySelectorAll('.menu-category');
    let currentCategory = 'all';

    // Search function
    function searchMenu(searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        menuItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('.description').textContent.toLowerCase();
            const details = item.getAttribute('data-details').toLowerCase();
            
            if (title.includes(searchTermLower) || 
                description.includes(searchTermLower) || 
                details.includes(searchTermLower)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Filter function
    function filterMenu(category) {
        currentCategory = category;
        menuCategories.forEach(cat => {
            if (category === 'all' || cat.getAttribute('data-category') === category) {
                cat.classList.remove('hidden');
                cat.classList.add('visible');
            } else {
                cat.classList.add('hidden');
                cat.classList.remove('visible');
            }
        });

        // Update active button
        filterButtons.forEach(button => {
            if (button.getAttribute('data-category') === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Event listeners for search
    searchInput.addEventListener('input', (e) => {
        searchMenu(e.target.value);
    });

    // Event listeners for filters
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterMenu(category);
        });
    });

    // Функція для відкриття модального вікна
    function openModal(item) {
        const details = item.getAttribute('data-details');
        const image = item.getAttribute('data-image');
        const title = item.querySelector('h3').textContent;

        modalImage.src = image;
        modalTitle.textContent = title;
        modalDescription.textContent = details;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Функція для закриття модального вікна
    function closeModalWindow() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обробка подій для кожного елемента меню
    menuItems.forEach(item => {
        // Для десктопів - показуємо "Детальніше" при наведенні
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.classList.add('show-details');
            }
        });

        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('show-details');
            }
        });

        // Для всіх пристроїв - відкриваємо модальне вікно при кліку/тапі
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(this);
        });

        // Додаткова обробка для тач-пристроїв
        item.addEventListener('touchend', function(e) {
            e.preventDefault();
            openModal(this);
        });
    });

    // Закриття модального вікна
    closeModal.addEventListener('click', closeModalWindow);
    closeModal.addEventListener('touchend', function(e) {
        e.preventDefault();
        closeModalWindow();
    });

    // Закриття при кліку поза модальним вікном
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalWindow();
        }
    });

    // Закриття при натисканні Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalWindow();
        }
    });

    // Оновлення при зміні розміру вікна
    window.addEventListener('resize', function() {
        menuItems.forEach(item => {
            if (window.innerWidth <= 768) {
                item.classList.remove('show-details');
            }
        });
    });
}); 