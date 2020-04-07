const $selector = (parent, child) => {
    return child ? parent.querySelector(child) : document.querySelector(parent)    
}

export default $selector