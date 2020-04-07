// @Styles
import './SliderGallery.scss'

// @Functions
// -----------------
import {
	$selector
} from 'Functions'
// -----------------

export default class SliderGallery {
    
    constructor(el, opts = {}) {

        this.sliders =  Array.isArray(el) ? 
                        el.map(item => $selector(item)) : 
                        [$selector(el)]
        
        this.opts = opts

        this.controls = this.navigation = false

        this.controlsOpts = this.navigationOpts = {
            parent: this.sliders[0].parentNode,
            position: 'beforeend'
        }

        if (!this.opts.responsive) this.opts.responsive = {}

        this._init()
    }

    _init() {
        
        // Init default media query
        let obj = this.opts.responsive[0] = {}
        
        
        // Fill defailt media query
        Object.keys(this.opts).map(key => {
            if (key !== 'responsive') { 
              obj[key] = this.opts[key]
            }
        })
        
        this._update()
    }

    _update() {
        this._load()
    }

    _resize() {

    }

    _load() {
        
        const ww = window.innerWidth
        const res = this.opts.responsive

        let prev = 0

        for (let x in res) {
            x = Math.round(x)
            if (x >= ww) break
            prev = x
        }

        Object.keys(res[prev]).map((key)=>{
            this[key] = res[prev][key]
        })

        

    }

    
}