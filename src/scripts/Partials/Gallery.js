import {
    $selector,
    $selectors
} from 'Functions'


export default class Gallery {
    constructor(el, opts = {}) {
        this.el = $selector(el)
        this.selectors = $selectors(`${el} ul`)
        this.slides = $selectors(`${el} .gallery__slider li`)
        this.nextBtn = $selector(`${el} .next`)
        this.prevBtn = $selector(`${el} .prev`)
        this.lists = []
        this.len = 0
        this.opts = opts
        this.active = opts.active ? opts.active : 0
        this.prev = null
        this.next = null
        this.init()
    }

    init() {
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
        this.nextBtn.addEventListener('click', () => { 
            this.goTo('next')
        })
        this.prevBtn.addEventListener('click', () => { 
            this.goTo('prev')
        })
    }

    goTo(dir) {
        let next = 0
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

        this.setSlides()
    }

    setSlides() {
        let w = this.slides[this.active].clientWidth
        this.slides[this.prev].style.transform = `matrix(1, 0, 0, 1, -${w}, 0)`
        this.slides[this.active].style.transform = `matrix(1, 0, 0, 1, 0, 0)`
        this.slides[this.next].style.transform = `matrix(1, 0, 0, 1, ${w}, 0)`
    }

}