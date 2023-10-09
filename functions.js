export {
  doIf,
  assign,
  indexOf, concat, forEach, map, removeByIndex,
  createElement, getById, 
  append, replaceChildren, getValue, removeValue,
}

const doIf = (cb, condition) => {
  if (condition) cb()
}

const {assign} = Object

const indexOf = (arr, item) => arr.indexOf(item)
const concat = (arr, ...items) => arr.concat(items)
const forEach = (arr, cb) => arr.forEach(cb)
const filter = (arr, cb) => arr.filter(cb)
const map = (arr, cb) => arr.map(cb)

const removeByIndex = (arr, i) => {
  return filter(arr, (_, index) => index != i)
}

const createElement = tagName => document.createElement(tagName)
const getById = id => document.getElementById(id)

const append = (element, ...children) => {
  element.append(...children)
}

const replaceChildren = (element, ...children) => {
  element.replaceChildren(...children)
}

const getValue = element => element.value
const setValue = (element, value) => element.value = value
const removeValue = element => setValue(element, '')
