// Проверяем сохраненную тему в localStorage
const currentTheme = localStorage.getItem('theme');
const body = document.body;
const themeToggle = document.getElementById('themeToggle');

if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<img src="https://www.svgrepo.com/show/309493/dark-theme.svg" alt="Переключить тему">';
} else {
    themeToggle.innerHTML = '<img src="https://www.svgrepo.com/show/309493/light-theme.svg" alt="Переключить тему">';
}

// Обработчик переключения темы
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

// Анимация при наведении на цену
const priceElement = document.querySelector('.price');
priceElement.addEventListener('mouseenter', () => {
    priceElement.style.transform = 'scale(1.05)';
});

priceElement.addEventListener('mouseleave', () => {
    priceElement.style.transform = 'scale(1)';
});