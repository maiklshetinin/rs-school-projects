import data from '../main/data.js'

let currentPage=0


const cases=[]
const burger = document.querySelector('.burger-menu')
const burgerSlider=document.querySelector('.burger')
const body=document.querySelector('.body')
const header=document.querySelector('.header')
const pets=document.querySelector('.pets')
const header__wrapper=document.querySelector('.header__wrapper')
const mask=document.querySelector('.mask')
const navList=document.querySelector('.nav-list')
const itemsLeft = document.querySelector('.items-left')
const itemsActive = document.querySelector('.items-active')
const itemsRight = document.querySelector('.items-right')

const BTN_BEGIN=document.querySelector('.button_paginator_to_begin')
const BTN_RIGHT=document.querySelector('.button_paginator_right')
const BTN_LEFT=document.querySelector('.button_paginator_left')
const BTN_END=document.querySelector('.button_paginator_to_end')

const pets_slider_wrapper=document.querySelector('.pets-slider-wrapper')
const page=document.querySelector('.button_paginator_activePage')
const container=document.querySelector('.container')

const popapMask=document.querySelector('.popap-mask')
const popap__button=document.querySelector('.popap__button')
const popap__modal=document.querySelector('.popap-modal')

let currenWidth=container.clientWidth
console.log(currenWidth)
//----------------------------------------------------------------------toggleBurger

const toggleBurger=()=>{
    burger.classList.toggle('active')
    burgerSlider.classList.toggle('active')
    body.classList.toggle('active')
    header.classList.toggle('active')
    header__wrapper.classList.toggle('active')
    mask.classList.toggle('active')
    pets.classList.toggle('remove-margin')
}

//-----------------------------------------------------------------------move

const moveLeft = () => {
    if (+page.innerHTML === 2) {
        BTN_LEFT.classList.add('inactive')
        BTN_BEGIN.classList.add('inactive')
    } else if (currenWidth >= 1280 && +page.innerHTML === 6) {
        BTN_RIGHT.classList.remove('inactive')
        BTN_END.classList.remove('inactive')
    } else if (currenWidth < 1280 && currenWidth >= 768 && +page.innerHTML === 8) {
        BTN_RIGHT.classList.remove('inactive')
        BTN_END.classList.remove('inactive')
    } else if (currenWidth < 768 && +page.innerHTML === 16) {
        BTN_RIGHT.classList.remove('inactive')
        BTN_END.classList.remove('inactive')
    }
   
    page.innerHTML=+page.innerHTML-1
    currentPage=+page.innerHTML-1
  
    itemsLeft.innerHTML = ''
    const cards = []
    for (let i = 0; i < cases[currentPage].length; i++) {
        cards.push(createCard(cases[currentPage][i]))
    }

    itemsLeft.append(...cards)
    pets_slider_wrapper.classList.add("transition-left");

    
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    if(+page.innerHTML===1){
        BTN_LEFT.classList.remove('inactive')
        BTN_BEGIN.classList.remove('inactive')
    }else if(currenWidth>=1280&&+page.innerHTML===5){
        BTN_RIGHT.classList.add('inactive')
        BTN_END.classList.add('inactive')
    }else if(currenWidth<1280&&currenWidth>=768&&+page.innerHTML===7){
        BTN_RIGHT.classList.add('inactive')
        BTN_END.classList.add('inactive')
    }else if(currenWidth<768&&+page.innerHTML===15){
        BTN_RIGHT.classList.add('inactive')
        BTN_END.classList.add('inactive')
    }

    page.innerHTML=+page.innerHTML+1
    currentPage=+page.innerHTML-1
    itemsRight.innerHTML = ''

    const cards = []
    for (let i = 0; i < cases[currentPage].length; i++) {
        cards.push(createCard(cases[currentPage][i]))
    }
    itemsRight.append(...cards)
    pets_slider_wrapper.classList.add("transition-right");

    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveBegin=()=>{
    itemsLeft.innerHTML = ''
    const cards = []
    for (let i = 0; i < cases[0].length; i++) {
        cards.push(createCard(cases[0][i]))
    }
    itemsLeft.append(...cards)
    pets_slider_wrapper.classList.add("transition-left");

    page.innerHTML= '1'
    currentPage=0

    BTN_LEFT.classList.add('inactive')
    BTN_BEGIN.classList.add('inactive')
    BTN_RIGHT.classList.remove('inactive')
    BTN_END.classList.remove('inactive')
    
}
const moveEnd=()=>{
    itemsRight.innerHTML = ''
    const cards = []
    for (let i = 0; i < cases[cases.length-1].length; i++) {
        cards.push(createCard(cases[cases.length-1][i]))
    }
    itemsRight.append(...cards)
    pets_slider_wrapper.classList.add("transition-right");

    page.innerHTML= cases.length
    currentPage=cases.length

    BTN_LEFT.classList.remove('inactive')
    BTN_BEGIN.classList.remove('inactive')
    BTN_RIGHT.classList.add('inactive')
    BTN_END.classList.add('inactive')
    
}


//-------------------------------------------------------------createCards

const createCards = () => {
    let pages=0
    if(currenWidth>=1280){
        pages=6
        console.log(pages)
    }else if(currenWidth<1280&&currenWidth>=768){
        pages=8
        console.log(pages)
    }else if(currenWidth<768){
        pages=16
        console.log(pages)
    }

    for (let i = 0; i < pages; i++) {
        let arr = shuffle()

        if (pages === 6) {
            cases.push(arr)
        }else if (pages === 8) {
            cases.push(arr.slice(0, 6))
        }else if (pages === 16) {
            cases.push(arr.slice(0, 3))
        }
    }
    console.log(cases)
    const firstPage = cases[0].map(number => createCard(number))
    itemsActive.append(...firstPage)
}

//-------------------------------------------------------------callPopap

function callPopap(event) {
    const index = event.target.dataset.index
   const modalContent=createModal(index)
   popap__modal.append(...modalContent)
  

    popapMask.classList.add('active')
    body.classList.add('active')

    header.classList.add('popap')
    pets.classList.add('popap')

}
//-------------------------------------------------------------closePopap

function closePopap(event) {
    if (event.target.classList.contains('popap__button') ||
        event.target.classList.contains('popap-mask')) {
        popapMask.classList.remove('active')
        body.classList.remove('active')
        popap__modal.innerHTML='<button class="popap__button"></button>'

        header.classList.remove('popap')
        pets.classList.remove('popap')
    }


}

//----------------------------------------------------------------------addEventListener

window.addEventListener('load', createCards)
burger.addEventListener('click',toggleBurger)
mask.addEventListener('click',toggleBurger)
navList.addEventListener('click',toggleBurger)
BTN_RIGHT.addEventListener('click',moveRight)
BTN_LEFT.addEventListener('click',moveLeft)
BTN_BEGIN.addEventListener('click',moveBegin)
BTN_END.addEventListener('click',moveEnd)

itemsActive.addEventListener('click',callPopap)
popap__button.addEventListener('click', closePopap)
popapMask.addEventListener('click', closePopap)

window.addEventListener('resize', () => {
    currenWidth = container.clientWidth
    console.log(currenWidth)
})

   
//-----------------------------------------------------------------------

pets_slider_wrapper.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
        pets_slider_wrapper.classList.remove("transition-left");
        document.querySelector(".items-active").innerHTML = itemsLeft.innerHTML;
    } else {
        pets_slider_wrapper.classList.remove("transition-right");
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

function shuffle() {
    let array = [0,1,2,3,4,5,6,7]
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
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