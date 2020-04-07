const $selectors = (parent, child) => {
    return child ? parent.querySelectorAll(child) : document.querySelectorAll(parent)
}

export default $selectors