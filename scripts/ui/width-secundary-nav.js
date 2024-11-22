const buttonOpenSecundaryNav = document.getElementById('button-open-second-nav');
const secondNav = document.querySelector('.secundary-nav-container');

buttonOpenSecundaryNav.addEventListener('click', () => {
    secondNav.classList.toggle('active');
})