const button = document.querySelector('[data-menu]');
const navigation = document.querySelector('[data-nav]');

button.addEventListener('click', () => {
    navigation.classList.toggle('header__nav--active');
})