import {
    $selector,
    $selectors
} from 'Functions'


export default class Gallery {
    constructor(el, opts = {}) {
        this.el = $selector(el)
        this.selectors = $selectors(`${el} ul`)
        this.nextBtn = $selector(`${el} .next`)
        this.prevBtn = $selector(`${el} .prev`)
        this.lists = []
        this.opts = opts
        this.active = opts.active ? opts.active : 0
        this.prev = null
        this.next = null
        this.init()
    }

    init() {
        this.getItems()
        this.handlers()
    }

    getItems() {
        for (let i = 0; i < this.selectors.length; i += 1) {
            this.lists.push({
                items: this.selectors[i].querySelectorAll('li')
            })
        }
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
        console.log(dir)
    }

}