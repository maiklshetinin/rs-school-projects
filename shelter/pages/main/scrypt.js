import data from './data.js'

let uniqueNumbers

const carouselWrapper = document.querySelector('.carousel-wrapper')
const BTN_LEFT = document.querySelector('.pets-slider-btn-left')
const BTN_RIGHT = document.querySelector('.pets-slider-btn-right')
const itemsLeft = document.querySelector('.items-left')
const itemsActive = document.querySelector('.items-active')
const itemsRight = document.querySelector('.items-right')
const burger = document.querySelector('.burger-menu')
const burgerSlider=document.querySelector('.burger')
const body=document.querySelector('.body')
const header=document.querySelector('.header')
const mask=document.querySelector('.mask')
const navList=document.querySelector('.nav-list')
const popapMask=document.querySelector('.popap-mask')
const popap__button=document.querySelector('.popap__button')
const popap__modal=document.querySelector('.popap-modal')


//-----------------------------------------------------------------------

const moveLeft = () => {
    itemsLeft.innerHTML = ''
    let numbers = excludeNumbers()
    let numbersIndex = generateUniqueNumbers(5)
    uniqueNumbers.length = 0
    const cards = []
    for (let i = 0; i < numbersIndex.length; i++) {
        let index = numbersIndex[i]
        cards.push(createCard(numbers[index]))
        uniqueNumbers.push(numbers[index])
    }
    itemsLeft.append(...cards)
    carouselWrapper.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    itemsRight.innerHTML = ''
    let numbers = excludeNumbers()
    let numbersIndex = generateUniqueNumbers(5)
    uniqueNumbers.length = 0
    const cards = []
    for (let i = 0; i < numbersIndex.length; i++) {
        let index = numbersIndex[i]
        cards.push(createCard(numbers[index]))
        uniqueNumbers.push(numbers[index])
    }
    itemsRight.append(...cards)
    carouselWrapper.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

//-------------------------------------------------------------createCards

const createCards = () => {
    uniqueNumbers = generateUniqueNumbers(8)
    const cards = uniqueNumbers.map(number => createCard(number))
    itemsActive.append(...cards)
}

//-------------------------------------------------------------toggleBurger

const toggleBurger=()=>{
    burger.classList.toggle('active')
    burgerSlider.classList.toggle('active')
    body.classList.toggle('active')
    header.classList.toggle('active')
    mask.classList.toggle('active')
}
//-------------------------------------------------------------callPopap

function callPopap(event) {
    const index = event.target.dataset.index
   const modalContent=createModal(index)
   popap__modal.append(...modalContent)
  

    popapMask.classList.add('active')
    body.classList.add('active')
}
//-------------------------------------------------------------closePopap

function closePopap(event) {
    if (event.target.classList.contains('popap__button') ||
        event.target.classList.contains('popap-mask')) {
        popapMask.classList.remove('active')
        body.classList.remove('active')
        popap__modal.innerHTML='<button class="popap__button"></button>'
    }

}

//---------------------------------------------------------------addEventListener

window.addEventListener('load', createCards)
BTN_LEFT.addEventListener('click', moveLeft)
BTN_RIGHT.addEventListener('click', moveRight)
burger.addEventListener('click',toggleBurger)
mask.addEventListener('click',toggleBurger)
navList.addEventListener('click',toggleBurger)
itemsActive.addEventListener('click',callPopap)
popap__button.addEventListener('click', closePopap)
popapMask.addEventListener('click', closePopap)

//-----------------------------------------------------------------------

carouselWrapper.addEventListener("animationend", (animationEvent) => {
    let changedItem;
    if (animationEvent.animationName === "move-left") {
        carouselWrapper.classList.remove("transition-left");

        document.querySelector(".items-active").innerHTML = itemsLeft.innerHTML;
    } else {
        carouselWrapper.classList.remove("transition-right");

        itemsActive.innerHTML = itemsRight.innerHTML;
    }

    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);

})


//------------------------------------------------------------helpers

function createCard(number) {
    const petsCard = document.createElement('div')
    petsCard.classList.add('pets-card')
    petsCard.setAttribute('data-index', number)

    const img = document.createElement('img')
    img.setAttribute('alt', data[number].type)
    img.setAttribute('src', data[number].img)
    petsCard.append(img)


    const h4 = document.createElement('h4')
    h4.classList.add('pets-card-title')
    h4.textContent = data[number].name
    petsCard.append(h4)

    const button = document.createElement('button')
    button.classList.add('pets-card-btn')
    button.innerHTML = 'Learn more'
    petsCard.append(button)
    return petsCard
}

function generateUniqueNumbers(max) {
    const uniqueNumbers = []
    while (uniqueNumbers.length < 3) {
        const randomNumber = Math.floor(Math.random() * max)
        if (!uniqueNumbers.includes(randomNumber)) {
            uniqueNumbers.push(randomNumber)
        }
    }
    return uniqueNumbers
}

function excludeNumbers() {
    let str = '01234567'
    let regexp0 = new RegExp(`${uniqueNumbers[0]}`, 'g')
    let regexp1 = new RegExp(`${uniqueNumbers[1]}`, 'g')
    let regexp2 = new RegExp(`${uniqueNumbers[2]}`, 'g')
    let result = str.replace(regexp0, '').replace(regexp1, '').replace(regexp2, '')
    return result.split('').map(num => +num)

}

function createModal (index){
    const result=[]

    const img=document.createElement('img')
    img.setAttribute('src', data[index].img)
    result.push(img)

    const content=document.createElement('div')
    content.classList.add('popap-content')
    content.innerHTML=`
    <h3>${data[index].name}</h3>
    <h4>${data[index].type} - ${data[index].breed}</h4>
    <p class='popap__description'>${data[index].description}</p>
   <p class='list__item'><span>Age: </span>${data[index].age}</p>
   <p class='list__item'><span>Inoculations: </span>${data[index].inoculations}</p>
   <p class='list__item'><span>Diseases: </span>${data[index].diseases}</p>
   <p class='list__item'><span>Parasite: </span>${data[index].parasites}</p>
    `;
    result.push(content)
    return result
}