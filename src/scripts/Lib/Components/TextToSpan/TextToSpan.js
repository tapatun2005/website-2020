// @Styles
import './TextToSpan.scss'

// @Functions
// -----------------
import {
	$selectors
} from 'Functions'
// -----------------

export default class TextToSpan {
    constructor(el) {
        this.els = $selectors(el)
        this.init()
    }

    init() {
        this.letters()
    }

    letters() {
        for (let i = 0; i < this.els.length; i += 1) {
            const str = this.els[i].innerHTML
            const arr = str.split(' ')
            let markup = `${arr.map((x) => `
                <div>
                    ${x.split('').map((y)=> `<span>${y}</span>`).join('')}
                </div>`).join('')}`
            this.els[i].innerHTML = markup
        }
    }
}