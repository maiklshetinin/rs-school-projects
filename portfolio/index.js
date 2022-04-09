console.log(`
    1. Вёрстка соотв. макету +48
        блок <header> +6
        секция hero +6
        секция skills +6
        секция portfolio +6
        секция video +6
        секция price +6
        секция contacts +6
        блок <footer> +6
    2. Ни на одном из разрешений до 320px вкл нет гор. полоса прокрутки +15
        нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
        нет полосы прокрутки при ширине страницы от 768рх до 480рх +5
        нет полосы прокрутки при ширине страницы от 480рх до 320рх +5
    3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22
        при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2
        при нажатии бургер-иконка изменяется на крестик +4
        высота адаптивного меню занимает всю высоту экрана +4
        при нажатии крестик превращается в бургер-иконку +4
        бургер-иконка создана при помощи css-анимаций без использования изображений +2
        ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
        при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается +4
    
        (оценка 75/75) 
    `)

const menuElem = document.querySelector('.menu')
const hamburger = document.querySelector('.hamburger');
const link = document.querySelector('.nav-list')
hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
    hamburger.classList.toggle('open');
    menuElem.classList.toggle('open')
}
function closeMenu() {
    menuElem.classList.remove('open');
    hamburger.classList.remove('open');
}
link.addEventListener('click', closeMenu)





