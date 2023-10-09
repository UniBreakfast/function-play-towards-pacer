const { entries } = Object

// Functional Wrappers
const getById = id => document.getElementById(id)

// Array Manipulation Functions
const map = (arr, fn) => arr.map(fn)
const filter = (arr, fn) => arr.filter(fn)
const forEach = (arr, fn) => arr.forEach(fn)
const concat = (arr, ...items) => arr.concat(items)
const indexOf = (arr, item) => arr.indexOf(item)
const splice = (arr, ...args) => arr.toSpliced(...args)

// String Manipulation Functions
const substring = (str, ...args) => str.substring(...args)
const toLowerCase = str => str.toLowerCase()

// State Manipulation Functions
const getInput = el => el.value
const emptyInput = el => { el.value = '' }

// Helper to remove item by index
const removeByIndex = (arr, index) => 
  filter(arr, (_, i) => i !== index)

// DOM related functions
const createTextNode = text => document.createTextNode(text)
const createElement = type => document.createElement(type)
const addEventListener = (element, event, fn) => element.addEventListener(event, fn)
const appendChild = (element, child) => element.appendChild(child)
const append = (container, ...children) => container.append(...children)
const replaceChildren = (container, ...children) => container.replaceChildren(...children)

export {
  entries,
  getById,
  map, filter, forEach, concat, indexOf, splice,
  substring, toLowerCase,
  getInput, emptyInput,
  removeByIndex,
  createTextNode, createElement, addEventListener,
  appendChild, append, replaceChildren
}
