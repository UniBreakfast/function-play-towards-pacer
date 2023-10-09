export {createVNode, render}

const createVNode = (tagName, props, ...children) => {
  return {type: tagName, props, children}
}

const render = (vNode, container) => {
  replaceChildren(container, renderElement(vNode))
}

const renderElement = vNode => {
  const {type, props, children} = vNode
  const element = createElement(type)
  const elements = map(children, renderElement)
  
  assign(element, props)
  append(element, ...elements)

  return element
}

import {
  assign, map, createElement, append, replaceChildren
} from './functions.js'
