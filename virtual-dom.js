import { 
  createTextNode, 
  createElement, 
  addEventListener,
  append, 
  replaceChildren, 
  forEach, 
  map 
} from './functions.js'

const createVNode = (type, props = {}, ...children) => ({ type, props, children })

const renderElement = vnode => {
  if (typeof vnode === 'string') return createTextNode(vnode)

  const element = createElement(vnode.type)

  forEach(Object.entries(vnode.props), ([key, value]) => {
    if (key.startsWith('on')) {
      addEventListener(element, key.substring(2).toLowerCase(), value)
    } else {
      element[key] = value
    }
  })

  append(element, ...map(vnode.children, renderElement))

  return element
}

const render = (vnode, container) => {
  replaceChildren(container, renderElement(vnode))
}

export { createVNode, render }
