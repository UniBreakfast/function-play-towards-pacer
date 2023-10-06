async function createElement(tag) {
  const element = document.createElement(tag)

  return element
}

async function addClass(element, className) {
  element = await clone(element)
  element.classList.add(className)

  return element
}

async function clone(element) {
  const clone = element.cloneNode(true)

  return clone
}
