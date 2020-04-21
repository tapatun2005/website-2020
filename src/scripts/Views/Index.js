// Styles
// -----------------------
import '@styles/style.scss'
import '@styles/Views/Index.scss'
// -----------------------

// Imports
// ------------------------
import '../../assets/images/placeholder.jpg'

// Init app scripts
// ---------------------
import App from '../App'
import Gallery from '../Partials/Gallery.js'


window.addEventListener('load', () => {
    const app = new App()
    const gallery = new Gallery('.gallery')
    console.log(app, gallery)
})
// ---------------------