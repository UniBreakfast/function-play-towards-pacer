// main.js
import { createVNode, render } from './simple-vdom.js'
import { createStore } from './simple-store.js'

// Functional Wrappers
const getById = id => document.getElementById(id)
const map = (fn, arr) => arr.map(fn)
const filter = (fn, arr) => arr.filter(fn)

// State Manipulation Functions
const getInput = el => el.value
const emptyInput = el => { el.value = '' }

// Define your actions and reducer
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

const addItem = text => ({ type: ADD_ITEM, text })
const removeItem = index => ({ type: REMOVE_ITEM, index })

// Helper to remove item by index
const removeByIndex = (arr, index) => 
  filter((_, i) => i !== index, arr)

// Pure version of reducer
const reducer = (state = { items: [] }, action) => {
  const { items } = state
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...items, action.text] }
    case REMOVE_ITEM:
      return { ...state, items: removeByIndex(items, action.index) }
    default:
      return state
  }
}

// Project-specific functions
const createRemoveButton = removeHandler =>
  createVNode('button', { onClick: removeHandler, textContent: 'Remove' })

// Pure version of createListItem
const createListItem = (text, removeHandler) =>
  createVNode('li', { textContent: text }, createRemoveButton(removeHandler))

// Pure App function
const App = ({ items, onAddItem, onRemoveItem }) =>
  createVNode('div', {},
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
