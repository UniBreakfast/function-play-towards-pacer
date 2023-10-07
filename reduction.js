import { removeByIndex } from './functions.js'

// Define your actions and reducer
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

const addItem = text => ({ type: ADD_ITEM, text })
const removeItem = index => ({ type: REMOVE_ITEM, index })

// Pure version of reducer
const reducer = (state = { items: [] }, action) => {
  const { items } = state
  const { type } = action
  
  switch (type) {
    case ADD_ITEM:
      return { ...state, items: [...items, action.text] }
    case REMOVE_ITEM:
      return { ...state, items: removeByIndex(items, action.index) }
    default:
      return state
  }
}

export { reducer, addItem, removeItem }
