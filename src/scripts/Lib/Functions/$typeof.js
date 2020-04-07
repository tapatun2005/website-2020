const $typeof = (obj) => {
    return {}.toString.call(obj).split(' ')[1].slice(0, -1)
}

export default $typeof