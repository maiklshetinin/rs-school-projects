const video = document.querySelector('.video')
const play = document.querySelector('.controls__play')
const controlsVolume = document.querySelector('.controls__volume')
const playBtnImg = document.querySelector('.play__btn')
const progress = document.querySelector('.progress')
const volume = document.querySelector('.volume')
const time = document.querySelector('.controls__time')
const poster = document.querySelector('.poster')
const playBtn = document.querySelector('.play-btn')
const volumeValue = document.querySelector('.volume-value')
const videoViewer = document.querySelector('.video-viewer')
const smallVideo = document.querySelector('.small-video')
const smallVideoTime = document.querySelector('.video-viewer-time')
const wrapperProgress = document.querySelector('.wrapper-progress')
const wrapperSmallVideo = document.querySelector('.wrapper-small-video')




//----------------------------------------------------------AddEvenListener
poster.addEventListener('click', () => {
    poster.style.opacity = '0'
    toggleVideoStatus()
    setInterval(() => {
        poster.style.display = 'none'
    }, 1000)
})

video.addEventListener('click', toggleVideoStatus)
video.addEventListener('timeupdate', updateProgress)
play.addEventListener('click', togglePlay)
playBtn.addEventListener('click', togglePlay)
progress.addEventListener('mouseup', () => {
    wrapperSmallVideo.classList.remove('blur')
})
progress.addEventListener('pointerup', () => {
    wrapperSmallVideo.classList.remove('blur')
    videoViewer.classList.remove('show')
    playBtn.classList.remove('z-index')
})
progress.addEventListener('input', setProgress)
// progress.addEventListener('mousemove', viewer)

progress.addEventListener('pointermove', viewer)
progress.addEventListener('mouseleave', () => {
    videoViewer.classList.remove('show')
    wrapperProgress.style.background = '#c8c8c8'
    playBtn.classList.remove('z-index')
})
volume.addEventListener('input', setVolume)
volume.addEventListener('change', () => { volumeValue.classList.remove('show') })
controlsVolume.addEventListener('click', () => {
    if (controlsVolume.classList.contains('volume-icon')) {
        controlsVolume.classList.remove('volume-icon')
        controlsVolume.classList.add('mute-icon')
        video.volume = '0'
    } else {
        controlsVolume.classList.remove('mute-icon')
        controlsVolume.classList.add('volume-icon')
        video.volume = volume.value / 100
    }
})
//-----------------------------------------------------------video-viewer


function viewer(e) {
    playBtn.classList.add('z-index')
    videoViewer.classList.add('show')
    progress.classList.add('show-progress')

    //currentTime

    smallVideo.currentTime = (e.offsetX / e.target.clientWidth) * smallVideo.duration

    //style.left-----------------------------------------------------------------------
    let x = (e.offsetX / e.target.clientWidth) * 100
   

    videoViewer.style.left = (e.offsetX / e.target.clientWidth) * smallVideo.duration + '%'

    //timer-------------------------------------------------
    let minutes = Math.floor(smallVideo.currentTime / 60)
    if (minutes < 10) {
        minutes = '0' + String(minutes)
    }
    let seconds = Math.floor(smallVideo.currentTime % 60)
    if (seconds < 10) {
        seconds = '0' + String(seconds)
    }
    smallVideoTime.textContent = `${minutes}:${seconds}`
    //------------------------------------------------------

    let color = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progress.value}%, #949494 ${progress.value}%, #949494 ${x}%, #c8c8c8 ${x}%, #c8c8c8 100%)`;
    wrapperProgress.style.background = color
}


//------------------------------------------------------------togglePlay
function togglePlay() {
    poster.style.opacity = '0'
    poster.classList.add('delete')
    if (play.classList.contains('play-icon')) {
        play.classList.remove('pause-icon')
        play.classList.add('play-icon')
    } else {
        play.classList.remove('play-icon')
        play.classList.add('pause-icon')
    }
    toggleVideoStatus()
}

//----------------------------------------------------------Play and Pause video
function toggleVideoStatus() {
    if (video.paused) {
        video.play()
        play.classList.remove('play-icon')
        play.classList.add('pause-icon')

        playBtn.style.opacity = '0'
    } else {
        video.pause()
        play.classList.remove('pause-icon')
        play.classList.add('play-icon')
        playBtn.style.opacity = '1'
    }
    console.log('toggleVideoStatus')
}
//--------------------------------------------------------- updateProgress
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100
    //minutes
    let minutes = Math.floor(video.currentTime / 60)
    if (minutes < 10) {
        minutes = '0' + String(minutes)
    }
    //seconds
    let seconds = Math.floor(video.currentTime % 60)
    if (seconds < 10) {
        seconds = '0' + String(seconds)
    }
    time.innerHTML = `${minutes}:${seconds}`
    time.style.color = '#c8c8c8'
    //progress in real time
    let color = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progress.value}%,transparent ${progress.value}%,transparent 100%)`;
    progress.style.background = color
}
//-----------------------------------------------------------setProgress
function setProgress() {


//     //for touchMobile
//     playBtn.classList.add('z-index')
//     videoViewer.classList.add('show')
//     progress.classList.add('show-progress')

//     smallVideo.currentTime=(progress.value * video.duration) / 100
//     //timer-------------------------------------------------
//     let minutes = Math.floor(smallVideo.currentTime / 60)
//     if (minutes < 10) {
//         minutes = '0' + String(minutes)
//     }
//     let seconds = Math.floor(smallVideo.currentTime % 60)
//     if (seconds < 10) {
//         seconds = '0' + String(seconds)
//     }
//     smallVideoTime.textContent = `${minutes}:${seconds}`
//     //------------------------------------------------------
//     videoViewer.style.left=progress.value + '%'
// //---------------------------------------------------------------------


    
    wrapperSmallVideo.classList.add('blur')
console.log('set progress')
    video.currentTime = (progress.value * video.duration) / 100
    //onChange progress
    let color = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progress.value}%,transparent ${progress.value}%,transparent 100%)`
    progress.style.background = color

}

//-----------------------------------------------------------setVolume  
function setVolume() {
    volumeVal()
    // volumeValue.style.opacity=volume.value/100
    volumeValue.classList.add('show')
    video.volume = volume.value / 100
    //change icon
    if (video.volume === 0) {
        controlsVolume.classList.remove('volume-icon')
        controlsVolume.classList.add('mute-icon')
    } else {
        controlsVolume.classList.remove('mute-icon')
        controlsVolume.classList.add('volume-icon')
    }
    //progress volume
    let color = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volume.value}%, #c8c8c8 ${volume.value}%, #c8c8c8 100%)`;
    volume.style.background = color
}
function volumeVal() {
    if (volume.value > 70) {
        volumeValue.classList.add('danger')
    } else {
        volumeValue.classList.remove('danger')
    }
    volumeValue.textContent = volume.value
    volumeValue.style.left = volume.value + '%'
    volumeValue.style.background = `linear-gradient(to top, #bdae82 0%, #bdae82 ${volume.value}%, transparent ${volume.value}%, transparent 100%)`

}

//--------------------------------------------------------------------------------------------------
console.log(`
дополнительный функционал:
//выделение ползунков доп. эффектами
//добавлен предпросмотр видео в уменьшенном масштабе
//размытие заднего фона при перемещении ползунка
//добавлен дополнительный прогресс бар на касании курсора
//добавлено время 
//доп. визуализация регулировки громкости 

 отметка - 70 балла(ов)
`)
