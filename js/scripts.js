
// menu items

const leftMenu = document.querySelector('.left-menu'); 
const burgerMenu = document.querySelector('.hamburger'); 

// open/close burger menu

function handleBurgerMenu(event){
    leftMenu.classList.toggle('openMenu');
    burgerMenu.classList.toggle('open'); 
}

burgerMenu.addEventListener('click', handleBurgerMenu);