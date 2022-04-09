const spriteRunLeft = './assets/spriteRunLeft.png'
const spriteRunRight = './assets/spriteRunRight.png'
const spriteStandLeft = './assets/spriteStandLeft.png'
const spriteStandRight = './assets/spriteStandRight.png'
const score = document.querySelector('.score_current')
const win = document.querySelector('.win')
const local = document.querySelector('.localStorage')
const btnClear = document.querySelector('.btn_clear')
const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 500
const gravity = 1.5
const platformPng = './assets/platform.png'
const platformSmallPng = './assets/platformSmall.png'
const platformSuperSmallPng = './assets/platformSuperSmall.png'
const layer2 = './assets/background2.png'
const layer7 = './assets/layer_07.png'
let offScroll = 0
let jumpCount = 0
let counter = 0
let arr = []
//-------------------------------------------------------------------addEventListener
window.addEventListener('load', getLocalStorage)
btnClear.addEventListener('click', () => {
    localStorage.clear()
    arr.length=0
    local.innerHTML = ''
})

//------------------------------------------------new Audio()

const jump = new Audio()
const lose = new Audio()
const winAudio = new Audio()
jump.src = './assets/jump.mp3'
lose.src = './assets/lose.mp3'
winAudio.src = './assets/win.mp3'



class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: 200,
            y: 0
        },
            this.velocity = {
                x: 0,
                y: 0
            }

        this.width = 66
        this.heigth = 150
        this.image = createImg(spriteStandRight)
        this.frames = 0
        this.sprites = {
            stand: {
                left: createImg(spriteStandLeft),
                right: createImg(spriteStandRight),
                cropWidth: 177,
                width: 66
            },
            run: {
                left: createImg(spriteRunLeft),
                right: createImg(spriteRunRight),
                cropWidth: 341,
                width: 127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }
    draw() {
        ctx.drawImage(this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.heigth)

    }

    update() {
        this.frames++
        if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
            this.frames = 0
        } else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
            this.frames = 0
        }
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.heigth + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
        // else{
        //     this.velocity.y=0
        // } 

    }
}
class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
    }
}
class Background {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
    }
}

//---------------------------------------------------------------------------createImg
function createImg(path) {
    const image = new Image()
    image.src = path
    return image
}

let platform
let platformSmall
let platformSuperSmall
let player = new Player()
let platforms = []
let background1
let background2


function init() {
    platform = createImg(platformPng)
    platformSmall = createImg(platformSmallPng)
    platformSuperSmall = createImg(platformSuperSmallPng)

    player = new Player()
    platforms = [
        new Platform({ x: 0, y: 450, image: platform }),
        new Platform({ x: platform.width + 150, y: 450, image: platform }),
        new Platform({ x: platform.width * 2 + 500, y: 450, image: platform }),
        new Platform({ x: platform.width * 3 + 850, y: 320, image: platformSmall }),
        new Platform({ x: platform.width * 4 + 1250, y: 450, image: platformSuperSmall }),
        new Platform({ x: platform.width * 5 + 1300, y: 450, image: platformSuperSmall }),
        new Platform({ x: platform.width * 6 + 1510, y: 450, image: platform }),
        new Platform({ x: platform.width * 7 + 1900, y: 450, image: platform }),
        new Platform({ x: platform.width * 8 + 2150, y: 310, image: platformSmall }),
        new Platform({ x: platform.width * 9 + 2450, y: 310, image: platformSuperSmall }),
        new Platform({ x: platform.width * 10 + 2670, y: 450, image: platform }),
        new Platform({ x: platform.width * 11 + 3000, y: 450, image: platformSuperSmall }),
        new Platform({ x: platform.width * 12 + 3150, y: 450, image: platform }),
        new Platform({ x: platform.width * 13 + 3510, y: 450, image: platform }),

    ]


    background1 = new Background({ x: 0, y: 0, image: createImg(layer7) })
    background2 = new Background({ x: 0, y: 0, image: createImg(layer2) })
}
let currentKey
const keys = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    up: {
        pressed: false
    },
    platformMovement: 'right'

}

//------------------------------------------------------------------animate

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background1.draw()
    background2.draw()

    platforms.forEach(platform => { platform.draw() })
    player.update()
    //---------------------------------------------------player movement
    platforms.forEach(platform => {
        if (keys.left.pressed && player.position.x > 150) {
            player.velocity.x = -player.speed
        } else if (keys.right.pressed && player.position.x < 500) {
            player.velocity.x = player.speed
        } else {
            player.velocity.x = 0
            if (keys.right.pressed) {
                background1.position.x -= 0.1
                background2.position.x -= 1
                offScroll += 1
                platform.position.x -= 10
            } else if (keys.left.pressed && offScroll !== 0) {
                background1.position.x += 0.1
                background2.position.x += 1
                offScroll -= 1
                platform.position.x += 10
            }
        }
    })


    //platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.heigth <= platform.position.y &&
            player.position.y + player.heigth + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0
        }
        if (!keys.up.pressed && player.position.y + player.height + 1 === platform.position.y) {
            player.velocity.y -= 25
            jumpCount++

        }

    })
    //sprite switching

    if (keys.right.pressed && currentKey === 'right' && player.currentSprite !== player.sprites.run.right) {
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } else if (keys.left.pressed && currentKey === 'left' && player.currentSprite !== player.sprites.run.left) {
        player.currentSprite = player.sprites.run.left
        player.currentCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } else if (!keys.right.pressed && currentKey === 'right' && player.currentSprite !== player.sprites.stand.right) {

        player.currentSprite = player.sprites.stand.right
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    } else if (!keys.left.pressed && currentKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
        player.currentSprite = player.sprites.stand.left
        player.currentCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }

    //---------------------------------------------------------------------win condition

    if (offScroll > 10000) {
        win.innerHTML = `you win!!!`
        winAudio.play()
    }

    //-----------------------------------------------------------------------lose condition

    if (player.position.y > canvas.height) {

        if (counter <= 9) {
            counter++
        } else {
            counter--
        }
        lose.play()
        setLocalStorage()
        getLocalStorage()
        init()
    }
    //-------------------------------------------------------------------------score
    score.innerHTML = `${Math.floor(offScroll / 100)}%`
    
}
init()
animate()


//------------------------------------------------------addEventListener
addEventListener('keydown', keyDown)
addEventListener('keyup', keyUp)

//-------------------------------------------------------------------
function setLocalStorage() {
    arr.push(`${Math.floor(offScroll / 100)}%`)
    localStorage.setItem('result', JSON.stringify(arr))
    offScroll = 0
}


function getLocalStorage() {
    local.innerHTML = ''
    if (localStorage.getItem('result')) {
        arr = JSON.parse(localStorage.getItem('result'))
        if (arr.length > 10) {
            arr.shift()
            console.log('if(result.length>10)')
        }
        result = arr.map(el => (createElement(el)))

        local.append(...result)
        console.log(arr)
    }

}

//------------------------------------------------------keyDown
function keyDown({ keyCode }) {
    switch (keyCode) {
        case 37:
            keys.left.pressed = true
            currentKey = 'left'
            break
        case 39:
            keys.right.pressed = true
            currentKey = 'right'
            break
        case 38:
            if (!keys.up.pressed && player.velocity.y === 0) {
                jump.play()
                player.velocity.y -= 25
            }
            keys.up.pressed = true
            break
        case 40:
            break
    }


}
//------------------------------------------------------keyUp
function keyUp({ keyCode }) {
    switch (keyCode) {
        case 37:
            keys.left.pressed = false
            break
        case 39:
            keys.right.pressed = false
            break
        case 38:
            keys.up.pressed = false
            jumpCount = 0
            player.velocity.y -= gravity
            break
        case 40:
            break
    }

}

//---------------------------------------------------------helpers

function createElement(value) {
    const honorElement = document.createElement('div')
    honorElement.textContent = value
    return honorElement

}

