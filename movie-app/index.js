new Gallery(document.getElementById('gallery'))

let url = 'https://api.themoviedb.org/3/search/movie?query=spring&api_key=5f870c76ca91d5f4b127b79448876593';
const gallerySection = document.querySelector('.gallery-section')
const searchInput = document.querySelector('.search')
const btnSearch = document.querySelector('.btn-search')
const btnClear = document.querySelector('.btn-clear')
console.log(btnSearch)

//-----------------------------------------------------------addEventListener
window.addEventListener('load',()=>{getData()})
searchInput.addEventListener('keydown',search)
btnSearch.onclick=(()=>{
    gallerySection.innerHTML=''
    url = `https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&api_key=5f870c76ca91d5f4b127b79448876593`
    getData()
})
btnClear.onclick=(()=>{
    searchInput.value=''
})

//----------------------------------------------------------search
function search(event){
if(event.code==='Enter'){
    gallerySection.innerHTML=''
    url = `https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&api_key=5f870c76ca91d5f4b127b79448876593`
    getData()
}else{
    console.log('Enter No')
}
}

//-----------------------------------------------------------async/await

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showDate(data)
}
// getData();

//-----------------------------------------------------------showDate(data)

function showDate(data) {
    const results = data.results
    results.map(obj => {   
       
        createVoteAverage(obj.vote_average)
        createReleaseDate(obj.release_date)
        createOverview(obj.overview)

        createPoster(obj.poster_path)
        createTitle(obj.title)
        createGalleryItem()
    })
}
//-----------------------------------------------------------createGalleryItem

const arr = []

function createGalleryItem() {
    const div = document.createElement('div')
    div.classList.add('gallery__item')
    div.append(...arr)
    gallerySection.append(div)
    arr.length=0

}
//-----------------------------------------------------------createPoster

const posterContainer=[]

console.log(posterContainer)
function createPoster(props) {
    const poster = document.createElement('div')
    poster.classList.add('gallery__poster')
    poster.style.backgroundImage =`url(https://image.tmdb.org/t/p/w1280${props})`

    const mask = document.createElement('div')
    mask.classList.add('gallery__mask')
    mask.append(...posterContainer)

    poster.append(mask)
    posterContainer.length=0
    arr.push(poster)
}

//----------------------------------------------------------createOverview

function createOverview(props) {
    const overview = document.createElement('p')
    overview.classList.add('galeery__overview')
    overview.textContent = props
    posterContainer.push(overview)
}

//----------------------------------------------------------createTitle

function createTitle(props) {
    const title = document.createElement('h2')
    if(props.length>16){
let str=props.slice(0,17)+' ...'
title.textContent = str
    }else{
        title.textContent = props
    }
    
   
    
    arr.push(title)
}

//---------------------------------------------------------createVoteAverage

function createVoteAverage(props) {
    const vote = document.createElement('span')
    vote.classList.add('gallery__vote')
    vote.textContent = props
    posterContainer.push(vote)
}

//----------------------------------------------------------createReleaseDate

function createReleaseDate(props) {
    let str = props.split('-').reverse().join('-')
    const release = document.createElement('p')
    release.classList.add('gallery__release')
    release.textContent = str
    posterContainer.push(release)
}
