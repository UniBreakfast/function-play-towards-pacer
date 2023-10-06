// main.js
import { getById, map, getInput, emptyInput } from './functions.js'
import { createVNode, render } from './virtual-dom.js'
import { createStore } from './store.js'
import { reducer, addItem, removeItem } from './reduction.js'

// Project-specific functions
const createRemoveButton = removeHandler =>
  createVNode('button', { onClick: removeHandler, textContent: 'Remove' })

// Pure version of createListItem
const createListItem = (text, removeHandler) =>
  createVNode('li', { textContent: text }, createRemoveButton(removeHandler))

// Pure App function
const App = ({ items, onAddItem, onRemoveItem }) => createVNode(
  'div', {},
  createVNode('input', { type: 'text', id: 'itemInput', placeholder: 'Type item here' }),
  createVNode('button', { onClick: onAddItem, textContent: 'Add' }),
  createVNode('ul', {}, ...map(
    (text, index) => createListItem(text, () => onRemoveItem(index)),
    items
  ))
)

// Handlers
const onAddItem = () => {
  const inputEl = getById('itemInput')
  const text = getInput(inputEl)
  
  if (text) {
    dispatch(addItem(text))
    emptyInput(inputEl)
  }
}

const onRemoveItem = index => {
  dispatch(removeItem(index))
}

// Pure update function
const update = (state) => {
  const appState = { ...state, onAddItem, onRemoveItem }

  render(App(appState), document.body)
}

// Create the store and destructure it
const { getState, dispatch, subscribe } = createStore(reducer, { items: [] })

// Initial render
update(getState())

// Subscribe to store updates
subscribe(update)
