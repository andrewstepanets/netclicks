
// menu items

const leftMenu = document.querySelector('.left-menu'); 
const burgerMenu = document.querySelector('.hamburger'); 

// open/close burger menu

function handleBurgerMenu(){
        leftMenu.classList.toggle('openMenu');
        burgerMenu.classList.toggle('open');
}

// close menu if click outside

function handleClickOutsideMenu(event) {
    if(!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        burgerMenu.classList.remove('open');
    }
}

function handleSubMenu(event){
    const dropdown = event.target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        burgerMenu.classList.add('open');
    }
    
}

burgerMenu.addEventListener('click', handleBurgerMenu);

document.addEventListener('click', handleClickOutsideMenu);

leftMenu.addEventListener('click', handleSubMenu);