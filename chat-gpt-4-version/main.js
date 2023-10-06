// main.js
import { createVNode, render } from './simple-vdom.js'
import { createStore } from './simple-store.js'

// Define your actions and reducer
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

const addItem = text => ({ type: ADD_ITEM, text })
const removeItem = index => ({ type: REMOVE_ITEM, index })

const reducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.text] }
    case REMOVE_ITEM:
      return { ...state, items: state.items.filter((_, i) => i !== action.index) }
    default:
      return state
  }
}

// Create the store and destructure it
const { getState, dispatch, subscribe } = createStore(reducer, { items: [] })

// Project-specific functions
const createRemoveButton = removeHandler => createVNode('button', { onClick: removeHandler, textContent: 'Remove' })

const createListItem = (text, removeHandler) =>
  createVNode(
    'li',
    { textContent: text },
    createRemoveButton(removeHandler)
  )

const App = ({ items, onAddItem, onRemoveItem }) => createVNode(
  'div',
  {},
  createVNode('input', { type: 'text', id: 'itemInput', placeholder: 'Type item here' }),
  createVNode('button', { onClick: onAddItem, textContent: 'Add' }),
  createVNode(
    'ul',
    {},
    ...items.map((text, index) => createListItem(text, () => onRemoveItem(index)))
  )
)

// Handlers
const onAddItem = () => {
  const text = document.getElementById('itemInput').value
  if (text) {
    dispatch(addItem(text))
    document.getElementById('itemInput').value = ''
  }
}

const onRemoveItem = index => {
  dispatch(removeItem(index))
}

// Update function to re-render the app
const update = (state) => {
  render(App({ ...state, onAddItem, onRemoveItem }), document.body)
}

// Initial render
update(getState())

// Subscribe to store updates
subscribe(update)
