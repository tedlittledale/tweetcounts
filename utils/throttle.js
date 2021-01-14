function throttle(callback, wait, immediate = false) {
  let timeout = null
  let initialCall = true
  return function() {
    const callNow = immediate && initialCall
    const next = () => {
      callback.apply(this, arguments)
      timeout = null
    }

    if (callNow) {
      initialCall = false
      next()
    }

    if (!timeout) {
      callback.apply(this, arguments)
      timeout = setTimeout(() => {
        initialCall = false
        timeout = null
      }, wait)
    }
  }
}

export default throttle
