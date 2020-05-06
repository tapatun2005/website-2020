import {
    $pauseEvent,
    $selector,
    $selectors
} from 'Functions'

import {
    TextToSpan
} from 'Components'


export default class Gallery {
    constructor(el, opts = {}) {
        this.el = $selector(el)
        this.selectors = $selectors(`${el} ul`)
        this.slides = $selectors(`${el} .gallery__slider li`)
        this.titles = `${el} h4`
        this.nextBtn = $selector(`${el} .next`)
        this.prevBtn = $selector(`${el} .prev`)
        this.lists = []
        this.len = 0
        this.opts = opts
        this.active = opts.active ? opts.active : 0
        this.prev = null
        this.next = null
        this.isDown = false
        this.init()
    }

    init() {
        
        if ($selector(this.titles)) {
           new TextToSpan(this.titles)
        }

        this.getItems()
        this.handlers()
        this.setPositions(0)
    }

    getItems() {
        for (let i = 0; i < this.selectors.length; i += 1) {
            this.lists.push({
                items: this.selectors[i].querySelectorAll('li')
            })
        }

        this.len = this.lists[0].items.length - 1
    }

    handlers() {
        this.nextBtn.addEventListener('click', () => this.goTo('next'))
        this.prevBtn.addEventListener('click', () => this.goTo('prev'))

        this.el.addEventListener('mousedown', (e) => this.mouseDown(e))
        this.el.addEventListener('mousemove', (e) => this.mouseMove(e))
        this.el.addEventListener('mouseup', () => this.mouseUp())
        this.el.addEventListener('touchstart', (e) => this.mouseDown(e))
        this.el.addEventListener('touchmove', (e) => this.mouseMove(e))
        this.el.addEventListener('touchend', () => this.mouseUp())
    
    }

    mouseDown(e) {
        $pauseEvent(e)
        this.isDown = true
        if (this.isDown)  {
            this.initialX = (e.clientX || e.touches[0].pageX)
        }
    }

    mouseMove(e) {
        $pauseEvent(e)
        if (this.isDown) {
            this.currentX   = e.clientX || e.touches[0].clientX
            this.diff = (this.currentX - this.initialX)
        }
    }

    mouseUp() {
        this.isDown = false
        if (Math.abs(this.diff) >= 50) {
            this.goTo(this.diff < 0 ? 'next' : 'prev')
        }
    }

    goTo(dir) {
        let next = null

        if (dir === 'next') {

            if (this.active === this.len) {
                next = 0
            } 
            else {
                next = this.active + 1
            }
        } 
        else {
            if (this.active === 0) {
                next = this.len
            } 
            else {
                next = this.active - 1
            }
        }
        console.log(next)

        this.setPositions(next)
    }

    setPositions(inx) {
        this.active = inx
        
        if (inx === 0) {
            this.prev = this.len
            this.next = inx + 1
        } 
        else if (inx === this.len) {
            this.prev = inx - 1
            this.next = 0
        } 
        else {
            this.prev = inx - 1
            this.next = inx + 1
        }

        this.setClasses()
        
    }

    setClasses() {
        
        for (let i = 0; i < this.lists.length; i += 1) {
            const x = this.lists[i].items
            
            for (let n = 0; n <= this.len; n += 1) {
                x[n].classList.remove('is-prev', 'is-active', 'is-next')   
            }

            // Prev
            x[this.prev].classList.add('is-prev')

            // Active
            x[this.active].classList.add('is-active')

            // Next
            x[this.next].classList.add('is-next')
        }

    }

}