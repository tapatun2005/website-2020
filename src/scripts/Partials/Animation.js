import {
    $selector
} from 'Functions'

export default class Animation {
    constructor(els = {}) {
        
        this.logo = $selector(els.logo)
        this.bg = $selector(els.bg)
        this.html = $selector('html')
        this.menu = $selector(els.menu)
        this.isRedirect = this._isRedirect()
        
        this.duration = 0

        this.scenes = {
            0: [
                {
                    cb: 'logoAnimate',
                    duration: 0
                }, 
                {
                    cb: 'logoScale',
                    duration: 250
                },
                {
                    cb: 'moveBg',
                    duration: 500
                },
                {
                    cb: 'menuShow',
                    duration: 400
                },
                {
                    cb: 'conplited',
                    duration: 200
                }
            ]
        }
        
        this.init()
    }

    init() {
        if (!this.isRedirect) {
            this.scene(0) 
        }
    }

    scene(inx) {
        for (let i = 0; i < this.scenes[inx].length; i += 1) {
            this.duration += this.scenes[inx][i].duration
            setTimeout(() => {
                this[this.scenes[inx][i].cb]()
            }, this.duration)
        }
    }

    logoAnimate() {
        this.logo.classList.add('is-animated')
    }

    logoScale() {
        this.logo.classList.add('is-scaled')
    }

    logoLeft() {
        this.logo.classList.add('is-left')
    }

    bgHalf() {
        this.bg.classList.add('is-half')
    }

    moveBg() {
        this.logoLeft()
        this.bgHalf()
    }

    menuShow() {
        this.menu.classList.add('is-visible')
    }

    _isRedirect() {
        return this.html.classList.contains('is-redirected') ? true : false
    }

    conplited() {
        console.log('hello')
    }

}

// setTimeout(() =>{
//     document.querySelector('.logo').classList.add('is-animated')
    
//     setTimeout(() => {
//         document.querySelector('.logo').classList.add('is-scaled')
        
//         setTimeout(() => {
//             document.querySelector('.logo').classList.add('is-left')
//             document.querySelector('#background').classList.add('is-half')

//             setTimeout(() => {
//                 document.querySelector('#menu__toggle').classList.add('is-visible')
//             }, 500)

//         }, 250)
//     }, 500)
// }, 500)