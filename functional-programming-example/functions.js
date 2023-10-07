
// Functional Wrappers
const getById = id => document.getElementById(id)
const map = (arr, fn) => arr.map(fn)
const filter = (arr, fn) => arr.filter(fn)
const forEach = (arr, fn) => arr.forEach(fn)

// State Manipulation Functions
const getInput = el => el.value
const emptyInput = el => { el.value = '' }

// Helper to remove item by index
const removeByIndex = (arr, index) => 
  filter(arr, (_, i) => i !== index)

// Virtual DOM related functions
const createTextNode = text => document.createTextNode(text)
const createElement = type => document.createElement(type)
const addEventListener = (element, event, fn) => element.addEventListener(event, fn)
const appendChild = (element, child) => element.appendChild(child)
const append = (container, ...children) => container.append(...children)
const replaceChildren = (container, ...children) => container.replaceChildren(...children)

export {
  getById,
  map,
  filter,
  forEach,
  getInput,
  emptyInput,
  removeByIndex,
  createTextNode,
  createElement,
  addEventListener,
  appendChild,
  append,
  replaceChildren
}
