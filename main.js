// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const overlay = document.querySelector('.overlay');

// Проверяем сохраненную тему в localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<img src="https://www.svgrepo.com/show/309493/dark-theme.svg" alt="Переключить тему">';
} else {
    themeToggle.innerHTML = '<img src="https://www.svgrepo.com/show/309493/light-theme.svg" alt="Переключить тему">';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Сохраняем выбор темы в localStorage
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<img src="https://www.svgrepo.com/show/309493/dark-theme.svg" alt="Переключить тему">';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<img src="https://www.svgrepo.com/show/309493/light-theme.svg" alt="Переключить тему">';
    }
});

// Слайдер игр
const sliderContainer = document.getElementById('sliderContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.slider-card');
const cardWidth = 150 + 15; // ширина карточки + gap
let currentPosition = 0;
const visibleCards = 5;
const maxPosition = -(cards.length - visibleCards) * cardWidth;

nextBtn.addEventListener('click', () => {
    if (currentPosition > maxPosition) {
        currentPosition -= cardWidth;
        sliderContainer.style.transform = `translateX(${currentPosition}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        sliderContainer.style.transform = `translateX(${currentPosition}px)`;
    }
});

// Автоматическая прокрутка
let autoSlideInterval = setInterval(() => {
    if (currentPosition <= maxPosition) {
        currentPosition = 0;
    } else {
        currentPosition -= cardWidth;
    }
    sliderContainer.style.transform = `translateX(${currentPosition}px)`;
}, 3000);

// Остановка авто-прокрутки при наведении
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        if (currentPosition <= maxPosition) {
            currentPosition = 0;
        } else {
            currentPosition -= cardWidth;
        }
        sliderContainer.style.transform = `translateX(${currentPosition}px)`;
    }, 3000);
});

// Логика корзины
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutBtn = document.getElementById('checkoutBtn');
const notification = document.getElementById('notification');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление корзины
function updateCart() {
    // Обновляем количество товаров
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Обновляем список товаров
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        cartTotal.textContent = '0 ₽';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price * item.quantity} ₽</div>
            </div>
            <button class="remove-item" data-index="${index}">&times;</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `${total} ₽`;
    
    // Сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Открытие/закрытие корзины
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Добавление товара в корзину
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем переход по ссылке
        e.stopPropagation(); // Предотвращаем всплытие события
        
        const title = button.getAttribute('data-title');
        const price = parseInt(button.getAttribute('data-price'));
        const img = button.getAttribute('data-img');
        
        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = cart.find(item => item.title === title);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                title,
                price,
                img,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Анимация добавления в корзину
        button.textContent = '✓';
        button.style.background = 'linear-gradient(135deg, #4cd137 0%, #44bd32 100%)';
        
        setTimeout(() => {
            button.textContent = '+';
            button.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
        }, 1000);
    });
});

// Удаление товара из корзины
cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        cart.splice(index, 1);
        updateCart();
    }
});

// Оформление заказа
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    // Показываем уведомление
    notification.style.display = 'block';
    
    // Очищаем корзину
    cart = [];
    updateCart();
    
    // Закрываем корзину
    cartModal.style.display = 'none';
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
});

// Инициализация корзины при загрузке страницы
updateCart();