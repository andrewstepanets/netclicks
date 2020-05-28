
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const NO_IMG = 'img/no-poster.jpg';


// menu items

const leftMenu = document.querySelector('.left-menu'); 
const burgerMenu = document.querySelector('.hamburger'); 
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');
const tvShows = document.querySelector('.tv-shows');

const tvCardImg = document.querySelector('.tv-card__img');
const modalTitle = document.querySelector('.modal__title');
const genresList = document.querySelector('.genres-list');
const rating = document.querySelector('.rating');
const description = document.querySelector('.description');
const modalLink = document.querySelector('.modal__link');

// search form and input
const searchForm = document.querySelector('.search__form');
const searchFormInput = document.querySelector('.search__form-input');

// add loading div
const loading = document.createElement('div');
loading.className = 'loading';




// cards class


const DBRequest = class {
    constructor(){
        this.API_KEY = '6359c138195c0ec6f99c45731e05330b';
        this.SITE_URL = 'https://api.themoviedb.org/3';
    }
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        }
    }
    getTestData = () => this.getData('test.json');
    getTestCard = () => this.getData('card.json');

    getSearchResult = query => this.getData(`${this.SITE_URL}/search/tv?api_key=${this.API_KEY}&language=ru-RU&query=${query}&page=1`);
    getTVShow = id => this.getData(`${this.SITE_URL}/tv/${id}?api_key=${this.API_KEY}&language=ru-RU`);
}


const renderCard = res => {
    tvShowsList.innerHTML = '';
    res.results.map(item => {
        const { backdrop_path: backdrop,
                name: title,
                poster_path: poster,
                vote_average: vote,
                id} = item;

        const posterIMG = poster ? IMG_URL+poster : NO_IMG;
        const backdropIMG = backdrop ? IMG_URL+backdrop : NO_IMG;
        const voteItem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';
                
        const card = `
            <li class="tv-shows__item" id=${id}>
                        <a href="#" class="tv-card" data-id=${id}>
                            ${voteItem}
                            <img class="tv-card__img"
                                src="${posterIMG}"
                                data-backdrop="${backdropIMG}"
                                alt="${title}">
                            <h4 class="tv-card__head">${title}</h4>
                        </a>
                    </li>
        `;
        
        loading.remove();
        tvShowsList.insertAdjacentHTML('beforeend', card);
        // tvShowsList.insertAdjacentElement('afterbegin', card);
        
    }).join('');
};


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
    event.preventDefault();
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
    const card = event.target.closest('.tv-card');
    console.log(card);
    
    if (card){
        new DBRequest()
            .getTVShow(card.dataset.id)
            .then( ( { poster_path: posterPath, 
                        name: title, 
                        genres, 
                        vote_average: vote, 
                        overview,
                        homepage} ) => {
                
                tvCardImg.src = IMG_URL + posterPath;
                tvCardImg.alt = title;
                modalTitle.textContent = title;
                genresList.innerHTML = genres.map(item => `
                                <li>${item.name}</li> 
                            `).join('');
                rating.textContent = vote;
                description.textContent = overview;
                modalLink.href = homepage;
            })
            .then( () => {
                    document.body.style.overflow = 'hidden'; // removing window scroll
                    modal.classList.remove('hide');
                }
            );

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

function handleSearchQuery(event) {
    event.preventDefault();
    const value = searchFormInput.value.trim();
    searchFormInput.value = '';

    if(value) {
        tvShows.append(loading);
        new DBRequest()
            .getSearchResult(value)
            .then(renderCard);
    }
    
}



burgerMenu.addEventListener('click', handleBurgerMenu);

document.addEventListener('click', handleClickOutsideMenu);

leftMenu.addEventListener('click', handleSubMenu);

tvShowsList.addEventListener('click', openModal);

modal.addEventListener('click', closeModal);

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);

searchForm.addEventListener('submit', handleSearchQuery);
