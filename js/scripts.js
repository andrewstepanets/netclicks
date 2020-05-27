

// menu items

const leftMenu = document.querySelector('.left-menu'); 
const burgerMenu = document.querySelector('.hamburger'); 
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');

// cards class


const DBRequest = class {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        }
    }
    getTestData = async () => await this.getData('test.json');
}

const renderCard = res => {
    res.results.map(item => {
        const card = `
            <li class="tv-shows__item">
                        <a href="#" class="tv-card">
                            <span class="tv-card__vote">7.1</span>
                            <img class="tv-card__img"
                                src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/2lsuke69bRdyB1sxtKmavtwkc35.jpg"
                                data-backdrop="https://image.tmdb.org/t/p/w185_and_h278_bestv2/pxkeqSHfTkefKz0y5naAX1u9cDw.jpg"
                                alt="Звёздные войны. Войны клонов">
                            <h4 class="tv-card__head">Звёздные войны. Войны клонов</h4>
                        </a>
                    </li>
        `;
        console.log(card);
        
        tvShowsList.append = card;
        
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
