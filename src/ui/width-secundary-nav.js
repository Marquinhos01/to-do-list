const buttonOpenSecundaryNav = document.getElementById('button-open-second-nav');
const secondNav = document.querySelector('.secundary-nav-container');
const OpenLists =  document.querySelector(".temporal-add-list-in-main"); // *  <--open lists options for phone

buttonOpenSecundaryNav.addEventListener('click', () => {
    secondNav.classList.toggle('active');
});

OpenLists.addEventListener("click",() => {
    secondNav.classList.add("active");
})
