import i18Obj from './translate.js';

let lang = 'en'
let theme = 'black'

const i18List = document.querySelectorAll("[data-i18]")
const portfolioImages = document.querySelectorAll('.portfolio-img')
const menuElem = document.querySelector('.menu')
const hamburger = document.querySelector('.hamburger');
const link = document.querySelector('.nav-list')
const portfolioButtons = document.querySelector('.portfolio-buttons-container')//find btns container
const switchLang = document.querySelector('.switch-lng')//find switch-lng container
const themes = document.querySelector('.theme-toggle')
const skills = document.querySelector('.section-skills')
const portfolio = document.querySelector('.section-portfolio')
const video = document.querySelector('.section-video')
const price = document.querySelector('.section-price')
const body = document.querySelector('body')

//-----------------------------------------------------------------getTranslate

function getTranslate(lang) {
    i18List.forEach((el) => {
        if (el.placeholder) {
            el.placeholder = i18Obj[lang][el.getAttribute('data-i18')]
            el.textContent = ''
        } else {
            el.textContent = i18Obj[lang][el.getAttribute('data-i18')]
        }

    });
}
//-----------------------------------------------------------------setLocalStorage

function setLocalStorage() {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage)

//-----------------------------------------------------------------getLocalStorage
function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
        getTranslate(lang);
    }
    if (localStorage.getItem('theme') === 'black') {
    } else {
        theme = localStorage.getItem('theme')
        toggleThemes()
    }
}
window.addEventListener('load', getLocalStorage)

//-----------------------------------------------------------------preloadImages
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const preloadImages = () => {
    for (let i = 1; i <= 6; i++) {
        seasons.forEach(season => {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`;
        })
    }
}

//---------------------------------------------------------addEvenListener

window.addEventListener('load', preloadImages)
hamburger.addEventListener('click', toggleMenu);
link.addEventListener('click',toggleMenu);
portfolioButtons.addEventListener('click', changeImage)
document.addEventListener('click', changeClassActive)

//---------------------------------------
themes.addEventListener('click', () => {
    if (theme === "black") {
        theme = 'light'
        toggleThemes()
    } else {
        theme = 'black'
        toggleThemes()
    }
})
//-----------------------------------------------
switchLang.addEventListener('click', (event) => {
    lang = event.target.getAttribute('data-lang')
    getTranslate(lang)
})

//-------------------------------------------------------------------toggleThemes

const arr = [skills, portfolio, video, price, body]
function toggleThemes() {

    arr.forEach(section => {
        section.classList.toggle('light-theme')
    })
}

//-------------------------------------------------------------------hamburger

function toggleMenu() {
    hamburger.classList.toggle('open');
    menuElem.classList.toggle('open')
}
// function closeMenu() {
//     menuElem.classList.remove('open');
//     hamburger.classList.remove('open');
// }

//-------------------------------------------------------------changeImage 

function changeImage(event) {
    if (event.target.classList.contains('portfolio-button')) {
        let data = event.target.dataset.season
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${data}/${index + 1}.jpg`);
    }
}

//-----------------------------------------------------------changeClassActive

function changeClassActive(event) {
    const className = event.target.className//get className
    const buttons = document.querySelectorAll(`.${className}`)//get list children
    buttons.forEach((el) => el.classList.remove('active'))
    const currentActive = event.target//get current element
    currentActive.classList.add('active')

}


//---------------------------------------------------------------------------------------------------------------button
const heroButton = document.querySelectorAll(".hero-button");
const priceButton = document.querySelectorAll(".price-item-button")
const contactButton = document.querySelectorAll(".contacts-form-button")


//-----------------------------------------------------------
const animateButton = function (e) {
    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    e.target.classList.remove('active');

    e.target.classList.add('animate');
    e.target.classList.add('active');
    setTimeout(function () {
        e.target.classList.remove('animate');
        e.target.classList.remove('active');
    }, 700);
};
//--------------------------------------------------------------------- 
heroButton.forEach(btn => { btn.addEventListener('click', animateButton) })
priceButton.forEach(btn => { btn.addEventListener('click', animateButton) })
contactButton.forEach(btn => { btn.addEventListener('click', animateButton) })

//---------------------------------------------------------------------------------console.log
console.log(`оценка75/75`)







