// @Styles
import './PageNavigation.scss'

// @Functions
import {
	$selector,
	$selectors
} from 'Functions'


export default class PageNavigation {
	
	
	constructor(el, config = {}) {
		
		this.el = $selector(el)
		this.responsive = config.responsive || null
		this.default = this.get_default(config)
		
		this.progressBar = config.progressBar || true
		this.ww = window.innerWidth
		this.prevBp = null

		this.anchors = $selectors(`${el} a[href^="#"]`)

	}

	// Actions
	// -----------------------
	init() {
		if (this.responsive) this.init_responsive()
		this.handlers()
	}

	init_responsive() {
		this.bps = []
		Object.keys(this.responsive).map(x => this.bps.push(Math.floor(x)))
		this.get_breakpoint()
	}

	handlers() {
		
		window.addEventListener('resize', () => this.resize())

		for (let i = 0; i < this.anchors.length; i++) {
			this.anchors[i].addEventListener('click', (e) => { 
				e.preventDefault()
				this.show(this.anchors[i])
			})
		}
	}

	resize() {
		if (!this.bps) return
		this.ww = window.innerWidth
		this.get_breakpoint()
	}

	reset() {
		console.log('reset')
	}

	show(anchor) {
		
		const href = anchor.getAttribute('href')
		const el = $selector(href)
		el.scrollIntoView()
		anchor.classList.add('is-active')

		const level = this.get_anchor_level(anchor)
		console.log(level)
	}

	// Getters
	// -----------------------
	get_default(obj) {
		delete obj.responsive
		return obj
	}


	get_breakpoint() {
		
		let bp = null
		
		for (let i = 0; i < this.bps.length; i++) {
			let x = this.bps[i]
			if (x > this.ww) {
				bp = x
				break
			}
		}
		
		this.bp = bp

		if (this.prevBp !== bp) {
			this.prevBp = bp
			this.get_breakpoint_configs()
		}
	}

	get_breakpoint_configs() {
		
		if (this.bp) {
			Object.keys(this.responsive[this.bp]).map(x => {
				this[x] = this.responsive[this.bp][x]
			})
		}

		else {
			Object.keys(this.default).map(x => {
				this[x] = this.default[x]
			})
		}

		this.reset()
	}

	get_anchor_level(anchor) {
		let level = 0
		let p = anchor.parentNode
		const next = (p) => {
			if (p !== this.el) {
				p = p.parentNode
				level += 1
				next(p)
			}
		}

		next(p)
		return level
	}


}