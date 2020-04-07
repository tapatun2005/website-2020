import {
    $selector,
    $selectors 
} from 'Functions'

import Animation from './Partials/Animation.js'
import Menu from './Partials/Menu.js'

export default class App {

    constructor() {
        this.html = $selector('html')
        this.app = $selector('#app')
        this.init()
    }

    init() {

        this.app.style.display = 'block'

        this.animation = new Animation({
            logo: '.logo',
            bg: '#background',
            menu: '#menu__toggle',
            html: this.html
        })

        this.menu = new Menu('#menu__list', '#menu__toggle')

        this.links()
        this.removeStorageRedirect()

    }

    links() {
        const links = $selectors('a')
        for (let i = 0; i < links.length; i += 1) {
            links[i].addEventListener('click', (e) => {
                e.preventDefault()
                sessionStorage.setItem('hi3redirect', true)
            })
        }
    }

    removeStorageRedirect() {
        sessionStorage.removeItem('hi3redirect')
    }

}