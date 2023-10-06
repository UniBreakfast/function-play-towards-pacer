// simple-vdom.js
const createVNode = (type, props = {}, ...children) => ({ type, props, children })

const renderElement = vnode => {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  const element = document.createElement(vnode.type)

  Object.entries(vnode.props).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      element.addEventListener(key.substring(2).toLowerCase(), value)
    } else {
      element[key] = value
    }
  })

  vnode.children
    .map(child => renderElement(child))
    .forEach(childElement => element.appendChild(childElement))

  return element
}

const render = (vnode, container) => {
  container.replaceChildren(renderElement(vnode))
}

export { createVNode, render }
