import {
    $selector
} from 'Functions'


export default class Menu {
    constructor(menu, toggle) {
        this.menu = $selector(menu)
        this.toggle = $selector(toggle)
        this.toggleIcon = $selector(`${toggle} > *`)
        this.init()
    }

    init() {
        this.toggleIcon.addEventListener('click', () => {
            this._toggle()
        })
    }

    _toggle() {
        this.menu.classList.toggle('is-active')
        this.toggle.classList.toggle('is-active')
    }
}