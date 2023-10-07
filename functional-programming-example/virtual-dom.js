import {
  entries,
  createTextNode, createElement, addEventListener,
  append, replaceChildren,
  forEach, map,
  substring, toLowerCase
} from './functions.js'

const createVNode = (type, props = {}, ...children) => ({ type, props, children })

const renderElement = vnode => {
  if (typeof vnode === 'string') return createTextNode(vnode)

  const element = createElement(vnode.type)

  forEach(entries(vnode.props), ([key, value]) => {
    if (key.startsWith('on')) {
      const eventName = toLowerCase(substring(key, 2))
      addEventListener(element, eventName, value)
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
