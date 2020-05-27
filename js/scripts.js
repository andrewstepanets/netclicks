

// menu items

const leftMenu = document.querySelector('.left-menu'); 
const burgerMenu = document.querySelector('.hamburger'); 
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');

const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const NO_IMG = 'img/no-poster.jpg';
const API_KEY = '6359c138195c0ec6f99c45731e05330b';

// cards class


const DBRequest = class {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        }
    }
    getTestData = () => this.getData('test.json');
}

const renderCard = res => {
    res.results.map(item => {
        console.log(item);
        const { backdrop_path: backdrop,
                name: title,
                poster_path: poster,
                vote_average: vote} = item;

        const posterIMG = poster ? IMG_URL+poster : NO_IMG;
        const backdropIMG = backdrop ? IMG_URL+backdrop : NO_IMG;
                
                
        const card = `
            <li class="tv-shows__item">
                        <a href="#" class="tv-card">
                            <span class="tv-card__vote">${vote}</span>
                            <img class="tv-card__img"
                                src="${posterIMG}"
                                data-backdrop="${backdropIMG}"
                                alt="${title}">
                            <h4 class="tv-card__head">${title}</h4>
                        </a>
                    </li>
        `;
        
        tvShowsList.insertAdjacentHTML('beforeend', card);
        // tvShowsList.insertAdjacentElement('afterbegin', card);
        
    });
};


new DBRequest().getTestData().then(renderCard);


// open/close burger menu

function handleBurgerMenu(){
        leftMenu.classList.toggle('openMenu');
        burgerMenu.classList.toggle('open');
}

// close menu if click outside

function handleClickOutsideMenu({ target } ) {
    if(!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        burgerMenu.classList.remove('open');
    }
}

// open subMenu

function handleSubMenu( {target} ){
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        burgerMenu.classList.add('open');
    }
    
}

// open modal window

function openModal( event ) {
    event.preventDefault(); // stop scrolling to top
    if (event.target.closest('.tv-card')){
        document.body.style.overflow = 'hidden'; // removing window scroll
        modal.classList.remove('hide');
    }
}


// close Modal

function closeModal( {target} ) {
    if(target.closest('.cross') || target.matches('.modal')) {
        document.body.style.overflow = ''; // removing window scroll
        modal.classList.add('hide');
    }
}

// change card icon, hower

function changeImage( {target} ) {
    const card = target.closest('.tv-shows__item');
    
    if (card){
        const img = card.querySelector('img');
        // check dataset properties
        img.dataset.backdrop && ([img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]);   
    }
}



burgerMenu.addEventListener('click', handleBurgerMenu);

document.addEventListener('click', handleClickOutsideMenu);

leftMenu.addEventListener('click', handleSubMenu);

tvShowsList.addEventListener('click', openModal);

modal.addEventListener('click', closeModal);

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);
